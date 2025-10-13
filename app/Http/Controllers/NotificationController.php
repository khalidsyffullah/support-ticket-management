<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display a list of all notifications for the user.
     */
    public function index()
    {
        return Inertia::render('Notifications/Index', [
            'notifications' => Auth::user()->notifications()->paginate(15)
        ]);
    }

    /**
     * Mark a single notification as read and redirect.
     */
    public function markTicketNotificationsAsRead(Request $request, \App\Models\Ticket $ticket)
    {
        Auth::user()->unreadNotifications()
            ->where('data->ticket_id', $ticket->id)
            ->update(['read_at' => now()]);

        return response()->noContent();
    }

    public function markAsRead(Request $request, $notificationId)
    {
        $notification = Auth::user()->notifications()->findOrFail($notificationId);
        $notification->markAsRead();

        $url = $notification->data['url'] ?? null;
        if ($url) {
            return redirect($url);
        }
        return back();
    }

    /**
     * Mark all unread notifications as read.
     */
    public function markAllAsRead()
    {
        Auth::user()->unreadNotifications->markAsRead();

        return back()->with('success', 'All notifications marked as read.');
    }
}
