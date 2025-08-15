<?php

namespace App\Http\Controllers;

use App\Http\Middleware\RedirectIfCustomer;
use App\Http\Middleware\RedirectIfNotParmitted;
use App\Models\City;
use App\Models\Country;
use App\Models\Organization;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
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
            'phone' => ['nullable', 'max:25'],
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

        $user = User::create($userRequest);

        if ($organization_id) {
            $user->organizations()->attach($organization_id);
        }

        return Redirect::route('customers')->with('success', 'User created.');
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

        if (Request::get('organization_id')) {
            $user->organizations()->sync(Request::get('organization_id'));
        } else {
            $user->organizations()->detach();
        }

        if(Request::file('photo')){
            if(isset($user->photo_path) && !empty($user->photo_path) && File::exists(public_path($user->photo_path))){
                File::delete(public_path($user->photo_path));
            }
            $user->update(['photo_path' => '/files/'.Request::file('photo')->store('users', ['disk' => 'file_uploads'])]);
        }

        if (Request::get('password')) {
            $user->update(['password' => Request::get('password')]);
        }

        return Redirect::back()->with('success', 'Customer updated.');
    }

    public function destroy(User $user)
    {
        if (config('app.demo')) {
            return Redirect::back()->with('error', 'Deleting customer is not allowed for the live demo.');
        }

        $user->delete();
        return Redirect::route('customers')->with('success', 'Customer deleted.');
    }
    public function restore(User $user){
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

        return Redirect::back()->with('success', 'Customer approved.');
    }

    public function reject(User $user)
    {
        if (config('app.demo')) {
            return Redirect::back()->with('error', 'Rejecting customer is not allowed for the live demo.');
        }

        $user->update(['approval_status' => User::STATUS_REJECTED]);

        return Redirect::back()->with('success', 'Customer rejected.');
    }

}
