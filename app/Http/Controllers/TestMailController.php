<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\TestEmail;

class TestMailController extends Controller
{
    // Show the form to enter email
    public function showForm()
    {
        return view('test_mail.form');
    }

    // Handle sending email
    public function sendEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        try {
            Mail::to($request->email)->send(new TestEmail());
            return back()->with('success', 'Test email sent successfully to ' . $request->email);
        } catch (\Throwable $e) {
            return back()->with('error', 'Mail sending failed: ' . $e->getMessage());
        }
    }
}
