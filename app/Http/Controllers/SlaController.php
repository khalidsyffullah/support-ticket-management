<?php

namespace App\Http\Controllers;

use App\Models\Sla;
use App\Models\Priority;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
}
