<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\AdvancedDataTable;
use App\Http\Controllers\Controller;
use App\Models\Protection;
use App\Models\Media;
use Illuminate\Http\Request;

class ProtectionController extends Controller
{
    public function index()
    {
        $datatable = Protection::datatable();

        // Ajax datatable request
        if (request()->ajax())
            return datatables()->of($datatable->Selection())->make();

        // Default datatable view
        return view('admin.layouts.datatable', ['datatable' => $datatable]);
    }

    public function show(Protection $protection)
    {
        return $protection;
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = Protection::validate();

        // Create the new post
        Protection::create($validatedData);

        // Assuming the model was successfully saved
        return response()->json(['status' => 'success', 'message' => __('datatable.added_successfully')]);
    }

    public function update(Protection $protection)
    {
        // Validate
        $validatedData = Protection::validate($protection);

        // Update
        $protection->update($validatedData);

        // Response
        return response()->json(['status' => 'success', 'message' => __('datatable.edit_successfully')]);
    }

    public function destroy(Request $request)
    {
        // IDs
        $ids = $request->input('ids', []);

        // Abort if auth()->user() is in the IDs
        if(in_array(auth()->user()->id, $ids)){
            return response()->json(['status' => 'error', 'message' => __('messages.unauthorized_action')], 500);
        }

        // Delete based on the provided IDs
        Protection::whereIn('id', $ids)->delete();

        // Response
        return response()->json(['status' => 'success', 'message' => __('datatable.added_successfully'),]);
    }
}
