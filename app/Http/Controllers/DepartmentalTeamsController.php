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
        $members = $department->users()->withPivot('team_head')->get();
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
            }
        }

        return redirect()->back()->with('success', 'Team member(s) added successfully.');
    }

    public function removeTeamMember(Request $request, Department $department, User $user)
    {
        $department->users()->detach($user);
        return redirect()->back()->with('success', 'Team member removed successfully.');
    }

    public function updateTeamHead(Request $request, Department $department, User $user)
    {
        $request->validate([
            'team_head' => 'required|boolean',
        ]);

        $department->users()->updateExistingPivot($user->id, [
            'team_head' => $request->team_head,
        ]);

        return redirect()->back()->with('success', 'Team head updated successfully.');
    }

    public function isTeamHead(Request $request, Department $department, User $user)
    {
        $is_team_head = $department->users()->where('user_id', $user->id)->wherePivot('team_head', true)->exists();
        return response()->json($is_team_head);
    }
}
