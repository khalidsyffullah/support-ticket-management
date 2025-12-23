<?php

namespace App\Http\Controllers;

use App\Http\Middleware\RedirectIfCustomer;
use App\Http\Middleware\RedirectIfNotParmitted;
use App\Mail\NewUserWelcome;
use App\Models\City;
use App\Models\Country;
use App\Models\Organization;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CustomersController extends Controller {
    public function __construct(){
        $this->middleware(RedirectIfNotParmitted::class.':customer');
    }
    public function index(){
        $customerRole = Role::where('slug', 'customer')->first();
        return Inertia::render('Customers/Index', [
            'title' => 'Customers',
            'filters' => Request::all(['search']),
            'users' => User::orderByName()
                ->whereRoleId($customerRole ? $customerRole->id : 0)
                ->filter(Request::all(['search']))
                ->paginate(10)
                ->withQueryString()
                ->through(fn ($user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'city' => $user->city,
                    'country' => $user->country_id ? $user->country->name: null,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'role' => $user->role,
                    'role_id' => $user->role_id,
                    'organization' => $user->organizations->first() ? $user->organizations->first()->name : null,
                    'photo' => $user->photo_path,
                    'approval_status' => $user->approval_status,

                    'created_at' => $user->created_at,
                ]),
        ]);
    }

    public function create(){
        return Inertia::render('Customers/Create',[
            'title' => 'Create a new customer',
            'organizations' => Organization::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'countries' => Country::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name')
        ]);
    }

    public function store(){
        $userRequest = Request::validate([
            'first_name' => ['required', 'max:50'],
            'last_name' => ['required', 'max:50'],
            'phone' => ['required', 'max:25'],
            'email' => ['required', 'max:50', 'email', Rule::unique('users')],
            'password' => ['required'],
            'city' => ['nullable'],
            'address' => ['nullable'],
            'country_id' => ['nullable'],
            'role_id' => ['nullable'],
            'organization_id' => ['required', 'exists:organizations,id'],
        ]);

        if (Request::get('organization_id')) {
            $organization = Organization::find(Request::get('organization_id'));
            if ($organization->users()->where('approval_status', User::STATUS_APPROVED)->count() >= $organization->max_customers) {
                return Redirect::back()->with('error', 'Customer limit for this organization has been reached.');
            }
        }

        if(Request::file('photo')){
            $userRequest['photo_path'] = Request::file('photo')->store('users');
        }

        $customerRole = Role::where('slug', 'customer')->first();
        if(empty($userRequest['role_id']) && !empty($customerRole)){
            $userRequest['role_id'] = $customerRole->id;
        }

        $userRequest['approval_status'] = User::STATUS_APPROVED;

        $organization_id = $userRequest['organization_id'];
        unset($userRequest['organization_id']);

        $plainPassword = $userRequest['password'];
        $userRequest['password'] = Hash::make($plainPassword);

        $user = User::create($userRequest);

        if ($organization_id) {
            $user->organizations()->attach($organization_id);
        }

        Mail::to($user->email)->send(new NewUserWelcome($user, $plainPassword));

        $authUser = auth()->user();
        $authUserName = $authUser->first_name;
        $authUserRole = $authUser->role->name;

        log_activity(
            'create',
            "Customer {$user->first_name} created by {$authUserName}({$authUserRole}).",
            $user
        );

        return redirect()->route('customers')->with('success', 'User created.');
    }

    public function edit(User $user)
    {
        $can_delete = 0;
        $logged_user = Auth()->user();
        if($logged_user['role']['slug'] === 'admin'){
            $can_delete = 1;
        }
        return Inertia::render('Customers/Edit', [
            'title' => $user->name,
            'user' => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'phone' => $user->phone,
                'city' => $user->city,
                'can_delete' => $can_delete,
                'address' => $user->address,
                'country_id' => $user->country_id,
                'organization_id' => $user->organizations->first() ? $user->organizations->first()->id : null,
                'organization_name' => $user->organization_name,
                'approval_status' => $user->approval_status,
                'photo_path' => $user->photo_path,
            ],
            'organizations' => Organization::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'countries' => Country::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'cities' => City::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name')
        ]);
    }

    public function update(User $user)
    {
        if (config('app.demo')) {
            return Redirect::back()->with('error', 'Updating customer is not allowed for the live demo.');
        }

        $originalUser = $user->getOriginal();

        Request::validate([
            'first_name' => ['required', 'max:50'],
            'last_name' => ['required', 'max:50'],
            'phone' => ['nullable', 'max:25'],
            'email' => ['required', 'max:50', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => ['nullable'],
            'city' => ['nullable'],
            'address' => ['nullable'],
            'country_id' => ['nullable'],
            'role_id' => ['nullable'],
            'organization_id' => ['required', 'exists:organizations,id'],
            'approval_status' => ['required', Rule::in([User::STATUS_PENDING, User::STATUS_APPROVED, User::STATUS_REJECTED])],
            'photo' => ['nullable', 'image'],
        ]);

        $newApprovalStatus = Request::get('approval_status');
        $currentApprovalStatus = $user->approval_status;
        $organizationId = Request::get('organization_id');

        if ($newApprovalStatus === User::STATUS_APPROVED && $currentApprovalStatus !== User::STATUS_APPROVED) {
            $organization = Organization::find($organizationId);
            if ($organization && $organization->users()->where('approval_status', User::STATUS_APPROVED)->count() >= $organization->max_customers) {
                return Redirect::back()->with('error', 'Customer limit for this organization has been reached.');
            }
        }

        $user->update(Request::only('first_name', 'last_name', 'phone', 'email', 'city', 'address', 'country_id', 'role_id', 'approval_status'));

        $authUser = auth()->user();
        $authUserName = $authUser->first_name;
        $authUserRole = $authUser->role->name;

        $fields = [
            'first_name' => 'first name',
            'last_name' => 'last name',
            'phone' => 'phone',
            'email' => 'email',
            'city' => 'city',
            'address' => 'address',
            'country_id' => 'country',
            'approval_status' => 'approval status',
        ];

        foreach ($fields as $field => $fieldName) {
            if (Request::filled($field) && $originalUser[$field] != Request::get($field)) {
                log_activity(
                    'update',
                    "Customer {$user->first_name} {$fieldName} updated by {$authUserName}({$authUserRole}).",
                    $user
                );
            }
        }

        // Handle organization_id change
        if (Request::filled('organization_id') && ($user->organizations->first()->id ?? null) != Request::get('organization_id')) {
            $newOrganization = Organization::find(Request::get('organization_id'))->name;
            log_activity(
                'update',
                "Customer {$user->first_name} organization updated to {$newOrganization} by {$authUserName}({$authUserRole}).",
                $user
            );
            $user->organizations()->sync(Request::get('organization_id'));
        } elseif (!Request::filled('organization_id') && ($user->organizations->first()->id ?? null) != null) {
            log_activity(
                'update',
                "Customer {$user->first_name} organization removed by {$authUserName}({$authUserRole}).",
                $user
            );
            $user->organizations()->detach();
        } else {
            if (Request::get('organization_id')) {
                $user->organizations()->sync(Request::get('organization_id'));
            } else {
                $user->organizations()->detach();
            }
        }

        // Handle photo_path change
        if(Request::file('photo')){
            if(isset($user->photo_path) && !empty($user->photo_path) && File::exists(public_path($user->photo_path))){
                File::delete(public_path($user->photo_path));
            }
            $user->update(['photo_path' => '/files/'.Request::file('photo')->store('users', ['disk' => 'file_uploads'])]);
            log_activity(
                'update',
                "Customer {$user->first_name} photo updated by {$authUserName}({$authUserRole}).",
                $user
            );
        }

        // Handle password change
        if (Request::get('password')) {
            $user->update(['password' => Hash::make(Request::get('password'))]);
            log_activity(
                'update',
                "Customer {$user->first_name} password updated by {$authUserName}({$authUserRole}).",
                $user
            );
        }

        return Redirect::back()->with('success', 'Customer updated.');
    }

    public function destroy(User $user)
    {
        if (config('app.demo')) {
            return Redirect::back()->with('error', 'Deleting customer is not allowed for the live demo.');
        }

        $authUser = auth()->user();
        $authUserName = $authUser->first_name;
        $authUserRole = $authUser->role->name;

        log_activity(
            'delete',
            "Customer {$user->first_name} deleted by {$authUserName}({$authUserRole}).",
            $user
        );

        $user->delete();
        return redirect()->route('customers')->with('success', 'Customer deleted.');
    }
    public function restore(User $user){
        $authUser = auth()->user();
        $authUserName = $authUser->first_name;
        $authUserRole = $authUser->role->name;

        log_activity(
            'restore',
            "Customer {$user->first_name} restored by {$authUserName}({$authUserRole}).",
            $user
        );
        $user->restore();
        return Redirect::back()->with('success', 'Customer restored!');
    }

    public function approve(User $user)
    {
        if (config('app.demo')) {
            return Redirect::back()->with('error', 'Approving customer is not allowed for the live demo.');
        }

        $organization = $user->organizations->first();

        if ($organization && $organization->users()->where('approval_status', User::STATUS_APPROVED)->count() >= $organization->max_customers) {
            return Redirect::back()->with('error', 'Customer limit for this organization has been reached.');
        }

        $user->update(['approval_status' => User::STATUS_APPROVED]);

        $authUser = auth()->user();
        $authUserName = $authUser->first_name;
        $authUserRole = $authUser->role->name;

        log_activity(
            'approve',
            "Customer {$user->first_name} approved by {$authUserName}({$authUserRole}).",
            $user
        );

        return Redirect::back()->with('success', 'Customer approved.');
    }

    public function reject(User $user)
    {
        if (config('app.demo')) {
            return Redirect::back()->with('error', 'Rejecting customer is not allowed for the live demo.');
        }

        $user->update(['approval_status' => User::STATUS_REJECTED]);

        $authUser = auth()->user();
        $authUserName = $authUser->first_name;
        $authUserRole = $authUser->role->name;

        log_activity(
            'reject',
            "Customer {$user->first_name} rejected by {$authUserName}({$authUserRole}).",
            $user
        );

        return Redirect::back()->with('success', 'Customer rejected.');
    }

    public function getOrganizationSuggestions(Request $request)
    {
        $query = $request->input('query');
        if (empty($query)) {
            return response()->json([]);
        }

        $organizations = Organization::get(['id', 'name']);
        $suggestions = $organizations->map(function ($organization) use ($query) {
            $organization->distance = levenshtein(strtolower($query), strtolower($organization->name));
            return $organization;
        })
        ->filter(function ($organization) {
            return $organization->distance < 5; // Keep only reasonably close matches
        })
        ->sortBy('distance')
        ->take(5)
        ->values();

        if ($suggestions->isEmpty()) {
            $suggestions = Organization::where('name', 'like', '%' . $query . '%')
                ->limit(5)
                ->get(['id', 'name']);
        }


        return response()->json($suggestions);
    }

}
