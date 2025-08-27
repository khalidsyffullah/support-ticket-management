<?php

namespace App\Http\Controllers;

use App\Models\UserNotification;
use App\Models\UserNotificationAttachment;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
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
            'files.*' => ['nullable', 'file', 'max:10240'], // 10MB max
        ]);

        $userNotification = UserNotification::create([
            'title' => $request->get('title'),
            'content' => $request->get('content'),
            'expires_at' => $request->get('expires_at'),
        ]);

        if ($request->hasFile('files')) {
            $files = $request->file('files');
            foreach ($files as $file) {
                $filename = Str::random(10) . '_' . $file->getClientOriginalName();
                $file->move(public_path('files/noticeboards'), $filename);
                UserNotificationAttachment::create([
                    'user_notification_id' => $userNotification->id,
                    'name' => $file->getClientOriginalName(),
                    'path' => 'noticeboards/' . $filename,
                ]);
            }
        }

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
                'attachments' => $userNotification->attachments,
            ],
        ]);
    }

    public function update(Request $request, UserNotification $userNotification)
    {
        $request->validate([
            'title' => ['required', 'max:255'],
            'content' => ['required'],
            'expires_at' => ['nullable', 'date'],
            'files.*' => ['nullable', 'file', 'max:10240'], // 10MB max
        ]);

        $userNotification->update($request->only('title', 'content', 'expires_at'));

        if ($request->hasFile('files')) {
            $files = $request->file('files');
            foreach ($files as $file) {
                $filename = Str::random(10) . '_' . $file->getClientOriginalName();
                $file->move(public_path('files/noticeboards'), $filename);
                UserNotificationAttachment::create([
                    'user_notification_id' => $userNotification->id,
                    'name' => $file->getClientOriginalName(),
                    'path' => 'noticeboards/' . $filename,
                ]);
            }
        }

        if ($request->get('removedFiles')) {
            $removedFiles = $request->get('removedFiles');
            foreach ($removedFiles as $fileId) {
                $attachment = UserNotificationAttachment::find($fileId);
                if ($attachment && $attachment->user_notification_id === $userNotification->id) {
                    if (file_exists(public_path('files/' . $attachment->path))) {
                        unlink(public_path('files/' . $attachment->path));
                    }
                    $attachment->delete();
                }
            }
        }

        return Redirect::back()->with('success', 'Notification updated.');
    }

    public function destroy(UserNotification $userNotification)
    {
        foreach ($userNotification->attachments as $attachment) {
            if (file_exists(public_path('files/' . $attachment->path))) {
                unlink(public_path('files/' . $attachment->path));
            }
            $attachment->delete();
        }
        $userNotification->delete();

        return Redirect::route('notifications')->with('success', 'Notification deleted.');
    }

    public function restore(UserNotification $userNotification)
    {
        $userNotification->restore();

        return Redirect::back()->with('success', 'Notification restored.');
    }
}