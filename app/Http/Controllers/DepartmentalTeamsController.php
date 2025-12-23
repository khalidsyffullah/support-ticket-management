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
        $members = $department->users()->withPivot('team_head', 'team_managers')->get();
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

    public function updateTeamHead(Request $request, Department $department, User $user)
    {
        $request->validate([
            'team_head' => 'required|boolean',
        ]);

        if ($request->team_head) {
            // Demote any existing team head
            $department->users()->where('team_head', true)->update(['team_head' => false]);
        }

        $department->users()->updateExistingPivot($user->id, [
            'team_head' => $request->team_head,
        ]);

        log_activity('update_team_head', "Updated team head status for user {$user->name} in department {$department->name}.", $department);

        return redirect()->back()->with('success', 'Team head updated successfully.');
    }

    public function isTeamHead(Request $request, Department $department, User $user)
    {
        $is_team_head = $department->users()->where('user_id', $user->id)->wherePivot('team_head', true)->exists();
        return response()->json($is_team_head);
    }

    public function toggleTeamManager(Request $request, Department $department, User $user)
    {
        $request->validate([
            'team_managers' => 'required|boolean',
        ]);

        $department->users()->updateExistingPivot($user->id, [
            'team_managers' => $request->team_managers,
        ]);

        $status = $request->team_managers ? 'promoted to' : 'demoted from';
        log_activity('update_team_manager', "User {$user->name} was {$status} team manager in department {$department->name}.", $department);

        return redirect()->back()->with('success', 'Team manager status updated successfully.');
    }
}
