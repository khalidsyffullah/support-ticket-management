<?php

namespace App\Http\Controllers;

use App\Models\UserNotification;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserNotificationsController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('UserNotifications/Index', [
            'title' => 'Notifications',
            'filters' => $request->all(['search']),
            'notifications' => UserNotification::orderBy('created_at', 'desc')
                ->filter($request->all(['search']))
                ->paginate(10)
                ->withQueryString()
                ->through(fn ($notification) => [
                    'id' => $notification->id,
                    'title' => $notification->title,
                    'expires_at' => $notification->expires_at,
                    'created_at' => $notification->created_at,
                ]),
        ]);
    }

    public function create()
    {
        return Inertia::render('UserNotifications/Create', [
            'title' => 'Create a new notification',
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'max:255'],
            'content' => ['required'],
            'expires_at' => ['nullable', 'date'],
        ]);

        UserNotification::create([
            'title' => $request->get('title'),
            'content' => $request->get('content'),
            'expires_at' => $request->get('expires_at'),
        ]);

        return Redirect::route('notifications')->with('success', 'Notification created.');
    }

    public function edit(UserNotification $userNotification)
    {
        return Inertia::render('UserNotifications/Edit', [
            'title' => $userNotification->title,
            'notification' => [
                'id' => $userNotification->id,
                'title' => $userNotification->title,
                'content' => $userNotification->content,
                'expires_at' => $userNotification->expires_at ? $userNotification->expires_at->format('Y-m-d\TH:i') : null,
            ],
        ]);
    }

    public function update(Request $request, UserNotification $userNotification)
    {
        $request->validate([
            'title' => ['required', 'max:255'],
            'content' => ['required'],
            'expires_at' => ['nullable', 'date'],
        ]);

        $userNotification->update($request->only('title', 'content', 'expires_at'));

        return Redirect::back()->with('success', 'Notification updated.');
    }

    public function destroy(UserNotification $userNotification)
    {
        $userNotification->delete();

        return Redirect::route('notifications')->with('success', 'Notification deleted.');
    }

    public function restore(UserNotification $userNotification)
    {
        $userNotification->restore();

        return Redirect::back()->with('success', 'Notification restored.');
    }
}