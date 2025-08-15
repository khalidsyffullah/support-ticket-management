<?php

namespace App\Http\Controllers\Auth;

use App\Events\ForgotPassword;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Role;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function create() {
        $is_demo = (int)config('app.demo');
        $env = DotenvEditor::load();
        $siteKey = $env->keyExists('RE_CAPTCHA_KEY')?$env->getValue('RE_CAPTCHA_KEY'):'';
        return Inertia::render('Auth/Login', ['is_demo' => $is_demo, 'site_key' => $siteKey]);
    }

    public function register() {
        $is_demo = (int)config('app.demo');
        $env = DotenvEditor::load();
        $siteKey = $env->keyExists('RE_CAPTCHA_KEY')?$env->getValue('RE_CAPTCHA_KEY'):'';
        return Inertia::render('Auth/Register', ['is_demo' => $is_demo, 'site_key' => $siteKey,
            'organizations' => \App\Models\Organization::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name')
        ]);
    }

    public function forgotPassword() {
        $is_demo = (int)config('app.demo');
        return Inertia::render('Auth/ForgotPassword', ['is_demo' => $is_demo]);
    }

    public function forgotPasswordMail(Request $request) {
        $requestData = $request->validate(['email' => 'required|email|exists:users']);

        $token = Str::random(64);
        DB::table('password_resets')->insert([
            'email' => $requestData['email'],
            'token' => $token,
            'created_at' => Carbon::now()
        ]);

        event(new ForgotPassword(['email' => $requestData['email'], 'token' => $token]));

        return back()->with('success', 'We have e-mailed your password reset link!');
    }

    public function forgotPasswordToken($token){
        return Inertia::render('Auth/ForgotPasswordInput', ['token' => $token]);
    }

    public function forgotPasswordStore(Request $request){
        $requestData = $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required',
            'token' => 'required'
        ]);

        $updatePassword = DB::table('password_resets')
            ->where([
                'email' => $requestData['email'],
                'token' => $requestData['token']
            ])
            ->first();

        if(!$updatePassword){
            return Redirect::back()->with('error', 'Invalid email or token!');
        }

        User::where('email', $requestData['email'])->update(['password' => Hash::make($requestData['password'])]);

        DB::table('password_resets')->where(['email'=> $requestData['email']])->delete();

        return Redirect::route('login')->with('success', 'Your password has been changed!');

    }



    /**
     * Handle an incoming authentication request.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $user = $request->user();

        if ($user->role && $user->role->slug === 'customer' && !$user->isApproved()) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return Redirect::back()->withErrors(['email' => 'Your account is not yet approved or has been rejected.']);
        }

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::DASHBOARD);
    }


    public function registerStore(Request $request) {

        $requestData = $request->validate([
            'first_name' => ['required', 'max:50'],
            'last_name' => ['required', 'max:50'],
            'email' => ['required', 'email'],
            'password' => ['required', 'min:10'],
            'phone' => ['nullable', 'max:20'],
            'country_id' => ['nullable', 'max:20'],
            'city' => ['nullable', 'max:30'],
            'address' => ['nullable'],
            'organization_id' => ['required', 'exists:organizations,id'],
        ]);

        $organization = \App\Models\Organization::find($requestData['organization_id']);
        if ($organization->users()->where('approval_status', \App\Models\User::STATUS_APPROVED)->count() >= $organization->max_customers) {
            return Redirect::back()->with('error', 'Customer limit for this organization has been reached.');
        }

        $role = Role::where('slug', 'customer')->first();
        if(!empty($role)){
            $requestData['role_id'] = $role->id;
        }else{
            $requestData['role_id'] = 2;
        }

        $requestData['approval_status'] = \App\Models\User::STATUS_PENDING;

        $organization_id = $requestData['organization_id'];
        unset($requestData['organization_id']);

        $user = User::create($requestData);
        $user->organizations()->attach($organization_id);

        return Redirect::route('login')->with('success', 'Registration successful! Your account is awaiting admin approval.');
    }

    /**
     * Destroy an authenticated session.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/login');
    }
}
