<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentalTeamsController extends Controller
{
    public function index()
    {
        $departments = Department::withCount('users')->get();
        return Inertia::render('DepartmentalTeams/Index', [
            'departments' => $departments,
        ]);
    }

    public function getTeamMembers(Request $request, Department $department)
    {
        $members = $department->users()->withPivot('team_manager', 'team_lead')->get();
        return response()->json($members);
    }

    public function getUsers(Request $request)
    {
        $users = User::whereDoesntHave('role', function ($query) {
            $query->where('name', 'customer');
        })->get();

        return response()->json($users);
    }

    public function addTeamMember(Request $request, Department $department)
    {
        $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        foreach ($request->user_ids as $user_id) {
            $user = User::find($user_id);
            if (!$department->users()->where('user_id', $user->id)->exists()) {
                $department->users()->attach($user);
                log_activity('add_member', "Added team member {$user->name} to department {$department->name}.", $department);
            }
        }

        return redirect()->back()->with('success', 'Team member(s) added successfully.');
    }

    public function removeTeamMember(Request $request, Department $department, User $user)
    {
        log_activity('remove_member', "Removed team member {$user->name} from department {$department->name}.", $department);
        $department->users()->detach($user);
        return redirect()->back()->with('success', 'Team member removed successfully.');
    }

    public function updateTeamManager(Request $request, Department $department, User $user)
    {
        $request->validate([
            'team_manager' => 'required|boolean',
        ]);

        if ($request->team_manager) {
            // Demote any existing team manager
            $department->users()->where('team_manager', true)->update(['team_manager' => false]);
        }

        $department->users()->updateExistingPivot($user->id, [
            'team_manager' => $request->team_manager,
        ]);

        log_activity('update_team_manager', "Updated team manager status for user {$user->name} in department {$department->name}.", $department);

        return redirect()->back()->with('success', 'Team manager updated successfully.');
    }

    public function isTeamManager(Request $request, Department $department, User $user)
    {
        $is_team_manager = $department->users()->where('user_id', $user->id)->wherePivot('team_manager', true)->exists();
        return response()->json($is_team_manager);
    }

    public function toggleTeamLead(Request $request, Department $department, User $user)
    {
        $request->validate([
            'team_lead' => 'required|boolean',
        ]);

        $department->users()->updateExistingPivot($user->id, [
            'team_lead' => $request->team_lead,
        ]);

        $status = $request->team_lead ? 'promoted to' : 'demoted from';
        log_activity('update_team_lead', "User {$user->name} was {$status} team lead in department {$department->name}.", $department);

        return redirect()->back()->with('success', 'Team lead status updated successfully.');
    }
}
