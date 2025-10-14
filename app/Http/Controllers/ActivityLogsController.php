<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityLogsController extends Controller
{
    public function index(Request $request)
    {
        $logsQuery = ActivityLog::with('user', 'loggable')->orderBy('created_at', 'desc');

        if ($request->filled('user_id')) {
            $logsQuery->where('user_id', $request->input('user_id'));
        }

        if ($request->filled('activity')) {
            $logsQuery->where('activity', $request->input('activity'));
        }

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $logsQuery->whereBetween('created_at', [$request->input('start_date'), $request->input('end_date')]);
        }

        return Inertia::render('Logs/Index', [
            'title' => 'Activity Logs',
            'filters' => $request->all(),
            'logs' => $logsQuery->paginate(20)->withQueryString(),
            'users' => User::orderBy('first_name')->get()->map->only('id', 'name'),
            'activities' => ActivityLog::select('activity')->distinct()->get()->pluck('activity'),
        ]);
    }

    public function destroy(Request $request)
    {
        if ($request->filled('activity')) {
            ActivityLog::where('activity', $request->input('activity'))->delete();
        } elseif ($request->filled('start_date') && $request->filled('end_date')) {
            ActivityLog::whereBetween('created_at', [$request->input('start_date'), $request->input('end_date')])->delete();
        } else {
            return redirect()->back()->with('error', 'Please select an activity or a date range to delete logs.');
        }

        return redirect()->back()->with('success', 'Logs deleted successfully.');
    }
}