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
            'user_id' => 'required|exists:users,id',
        ]);

        $user = User::find($request->user_id);

        if ($department->users()->where('user_id', $user->id)->exists()) {
            return redirect()->back()->with('error', 'User already in the team.');
        }

        $department->users()->attach($user);

        return redirect()->back()->with('success', 'Team member added successfully.');
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
}
