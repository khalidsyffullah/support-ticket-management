<?php

namespace App\Http\Controllers;

use App\Models\Sla;
use App\Models\Priority;
use App\Models\User;
use App\Models\TicketSla;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class SlaController extends Controller
{
    public function index()
    {
        return Inertia::render('Sla/Index', [
            'title' => 'SLA Policies',
            'slas' => Sla::with('priority')->get(),
            'priorities' => Priority::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'priority_id' => 'required|exists:priorities,id|unique:slas,priority_id',
            'response_time' => 'required|integer|min:1',
            'resolution_time' => 'required|integer|min:1',
        ]);

        Sla::create($request->all());

        return redirect()->route('sla.index')->with('success', 'SLA policy created successfully.');
    }

    public function update(Request $request, Sla $sla)
    {
        $request->validate([
            'response_time' => 'required|integer|min:1',
            'resolution_time' => 'required|integer|min:1',
        ]);

        $sla->update($request->all());

        return redirect()->route('sla.index')->with('success', 'SLA policy updated successfully.');
    }

    public function destroy(Sla $sla)
    {
        $sla->delete();

        return redirect()->route('sla.index')->with('success', 'SLA policy deleted successfully.');
    }

    public function userReportsIndex(Request $request)
    {
        $sortBy = $request->query('sort_by', 'name'); // Default sort by name
        $sortDirection = $request->query('sort_direction', 'asc'); // Default sort direction asc

        $users = User::with('role')->get()->map(function ($user) {
            $assignedTickets = TicketSla::where('user_id', $user->id)->count();
            $breachedTickets = TicketSla::where('user_id', $user->id)->where('status', 'breached')->count();
            $completedTickets = TicketSla::where('user_id', $user->id)->where('status', 'completed')->count();

            $totalResponseTime = TicketSla::where('user_id', $user->id)
                ->whereNotNull('response_sla_starts_at')
                ->whereNotNull('resolution_sla_ends_at')
                ->sum('total_sla_time');

            $averageResponseTime = $completedTickets > 0 ? round($totalResponseTime / $completedTickets, 2) : 0;

            return [
                'id' => $user->id,
                'name' => $user->first_name . ' ' . $user->last_name,
                'role' => $user->role ? $user->role->name : 'N/A',
                'assigned_tickets' => $assignedTickets,
                'breached_tickets' => $breachedTickets,
                'completed_tickets' => $completedTickets,
                'average_response_time' => $averageResponseTime,
            ];
        });

        // Apply sorting to the collection
        if ($sortDirection === 'desc') {
            $users = $users->sortByDesc($sortBy);
        } else {
            $users = $users->sortBy($sortBy);
        }

        // Re-index the collection after sorting
        $users = $users->values();


        return Inertia::render('Sla/UserReports', [
            'title' => 'User SLA Reports',
            'users' => $users,
            'sortBy' => $sortBy, // Pass current sort_by to frontend
            'sortDirection' => $sortDirection, // Pass current sort_direction to frontend
        ]);
    }

    public function userSlaReport(User $user)
    {
        $ticketSlas = TicketSla::with(['ticket.priority', 'sla'])
            ->where('user_id', $user->id)
            ->get()
            ->map(function ($ticketSla) {
                $resolutionTime = null;
                if ($ticketSla->response_sla_starts_at && $ticketSla->resolution_sla_ends_at) {
                    $start = Carbon::parse($ticketSla->response_sla_starts_at);
                    $end = Carbon::parse($ticketSla->resolution_sla_ends_at);
                    $resolutionTime = $end->diffInMinutes($start);
                }

                return [
                    'id' => $ticketSla->id,
                    'ticket_uid' => $ticketSla->ticket->uid,
                    'ticket_subject' => $ticketSla->ticket->subject,
                    'priority' => $ticketSla->ticket->priority->name,
                    'status' => $ticketSla->status,
                    'response_sla_starts_at' => $ticketSla->response_sla_starts_at,
                    'resolution_sla_ends_at' => $ticketSla->resolution_sla_ends_at,
                    'total_sla_time' => $ticketSla->total_sla_time,
                    'breached_at' => $ticketSla->breached_at,
                    'resolution_time_taken' => $resolutionTime,
                ];
            });

        return Inertia::render('Sla/UserSlaDetails', [
            'title' => 'SLA Report for ' . $user->first_name . ' ' . $user->last_name,
            'user' => $user->only('id', 'first_name', 'last_name'),
            'ticketSlas' => $ticketSlas,
        ]);
    }

    public function overallSlaReport()
    {
        $totalTickets = TicketSla::count();
        $breachedTickets = TicketSla::where('status', 'breached')->count();
        $completedTickets = TicketSla::where('status', 'completed')->count();

        $totalResolutionTime = TicketSla::where('status', 'completed')->sum('total_sla_time');
        $averageResolutionTime = $completedTickets > 0 ? round($totalResolutionTime / $completedTickets, 2) : 0;

        return Inertia::render('Sla/OverallSlaReport', [
            'title' => 'Overall SLA Report',
            'total_tickets' => $totalTickets,
            'breached_tickets' => $breachedTickets,
            'completed_tickets' => $completedTickets,
            'average_resolution_time' => $averageResolutionTime,
        ]);
    }
}
