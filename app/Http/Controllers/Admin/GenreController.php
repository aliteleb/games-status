<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function index()
    {
        $datatable = Genre::datatable();

        // Ajax datatable request
        if (request()->ajax())
            return datatables()->of($datatable->Selection())->make();

        // Default datatable view
        return view('admin.layouts.datatable', ['datatable' => $datatable]);
    }

    public function show(Genre $Genre)
    {
        return $Genre;
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = Genre::validate();

        // Create the new post
        Genre::create($validatedData);

        // Assuming the model was successfully saved
        return response()->json(['status' => 'success', 'message' => __('datatable.added_successfully')]);
    }

    public function update(Genre $Genre)
    {
        // Validate
        $validatedData = Genre::validate($Genre);

        // Update
        $Genre->update($validatedData);

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
        Genre::whereIn('id', $ids)->delete();

        // Response
        return response()->json(['status' => 'success', 'message' => __('datatable.added_successfully'),]);
    }
}
