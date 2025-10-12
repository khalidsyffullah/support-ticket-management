<?php

namespace App\Http\Controllers;

use App\Http\Middleware\RedirectIfCustomer;
use App\Http\Middleware\RedirectIfNotParmitted;
use App\Models\City;
use App\Models\Country;
use App\Models\Organization;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class OrganizationsController extends Controller
{
    public function __construct(){
        $this->middleware(RedirectIfNotParmitted::class.':organization');
    }

    public function index()
    {
        $parentId = Request::input('parent_id');

        $organizationsQuery = Organization::with('parent', 'children')
            ->orderBy('name')
            ->filter(Request::only('search'));

        // If parent_id is provided, show children of that parent
        if ($parentId !== null) {
            $organizationsQuery->where('parent_id', $parentId);
        }
        // Otherwise show ALL organizations (both parent and child)

        return Inertia::render('Organizations/Index', [
            'title' => 'Organizations',
            'filters' => Request::all('search', 'parent_id'),
            'parent_id' => $parentId,
            'organizations' => $organizationsQuery
                ->paginate(8)
                ->withQueryString()
                ->through(function ($organization) {
                    return [
                        'id' => $organization->id,
                        'name' => $organization->name,
                        'phone' => $organization->phone,
                        'city' => $organization->city,
                        'parent' => $organization->parent ? $organization->parent->only('id', 'name') : null,
                        'has_children' => $organization->children()->exists(),
                        'children_count' => $organization->children()->count(),
                    ];
                }),
            'parent_organizations' => $this->buildOrganizationTree(),
            'current_parent' => $parentId ? Organization::find($parentId) : null,
        ]);
    }

    /**
     * Build hierarchical tree of organizations for dropdown
     * Only shows organizations that have children (are parents)
     */
    private function buildOrganizationTree($excludeId = null)
    {
        $organizations = Organization::with('children')
            ->whereNull('parent_id')
            ->has('children')
            ->orderBy('name')
            ->get();

        return $this->formatOrganizationTree($organizations, 0, $excludeId);
    }

    /**
     * Format organizations into a flat array with indentation prefix
     * Only includes organizations that have children
     * Example: A2I, — B2C, —— C2C
     */
    private function formatOrganizationTree($organizations, $level = 0, $excludeId = null)
    {
        $result = [];
        $prefix = str_repeat('— ', $level);

        foreach ($organizations as $org) {
            if ($excludeId && $org->id === $excludeId) {
                continue;
            }

            $result[] = [
                'id' => $org->id,
                'name' => $prefix . $org->name,
                'level' => $level,
            ];

            // Recursively add only children that have their own children
            $childrenWithChildren = $org->children()
                ->has('children')
                ->orderBy('name')
                ->get();

            if ($childrenWithChildren->isNotEmpty()) {
                $result = array_merge(
                    $result,
                    $this->formatOrganizationTree($childrenWithChildren, $level + 1, $excludeId)
                );
            }
        }

        return $result;
    }

    public function create()
    {
        return Inertia::render('Organizations/Create',[
            'title' => 'Create a new organization',
            'countries' => Country::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'cities' => City::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'parent_organizations' => Organization::parents()->orderBy('name')->get()->map->only('id', 'name'),
        ]);
    }

    public function store()
    {
        Organization::create(
            Request::validate([
                'name' => ['required', 'max:100'],
                'email' => ['nullable', 'max:50', 'email'],
                'phone' => ['nullable', 'max:50'],
                'address' => ['required', 'max:150'],
                'city' => ['required', 'max:50'],
                'region' => ['required', 'max:50'],
                'country' => ['nullable', 'max:2'],
                'postal_code' => ['nullable', 'max:25'],
                'max_customers' => ['required', 'integer', 'min:1'],
                'parent_id' => ['nullable', 'exists:organizations,id'],
            ])
        );

        return Redirect::route('organizations')->with('success', 'Organization created.');
    }

    public function edit(Organization $organization)
    {
        return Inertia::render('Organizations/Edit', [
            'title' => $organization->name,
            'countries' => Country::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'cities' => City::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'parent_organizations' => Organization::parents()->orderBy('name')->get()->map->only('id', 'name'),
            'organization' => [
                'id' => $organization->id,
                'name' => $organization->name,
                'email' => $organization->email,
                'phone' => $organization->phone,
                'address' => $organization->address,
                'city' => $organization->city,
                'region' => $organization->region,
                'country' => $organization->country,
                'postal_code' => $organization->postal_code,
                'max_customers' => $organization->max_customers,
                'parent_id' => $organization->parent_id,
                'customers' => $organization->users()->whereHas('role', function ($query) {
                    $query->where('slug', 'customer');
                })->orderByName()->get()->map->only('id', 'name', 'email', 'phone'),
            ],
        ]);
    }

    public function update(Organization $organization)
    {
        $organization->update(
            Request::validate([
                'name' => ['required', 'max:100'],
                'email' => ['nullable', 'max:50', 'email'],
                'phone' => ['nullable', 'max:50'],
                'address' => ['required', 'max:150'],
                'city' => ['required', 'max:50'],
                'region' => ['required', 'max:50'],
                'country' => ['nullable', 'max:2'],
                'postal_code' => ['nullable', 'max:25'],
                'max_customers' => ['required', 'integer', 'min:1'],
                'parent_id' => ['nullable', 'exists:organizations,id'],
            ])
        );

        return Redirect::back()->with('success', 'Organization updated.');
    }

    public function destroy(Organization $organization)
    {
        $organization->delete();

        return Redirect::route('organizations')->with('success', 'Organization deleted.');
    }

    public function restore(Organization $organization)
    {
        $organization->restore();

        return Redirect::back()->with('success', 'Organization restored.');
    }
}
