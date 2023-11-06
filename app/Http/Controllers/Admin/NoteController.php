<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index()
    {
        $datatable = Note::datatable();

        // Ajax datatable request
        if (request()->ajax())
            return datatables()->of($datatable->Selection())->make();

        // Default datatable view
        return view('admin.layouts.datatable', ['datatable' => $datatable]);
    }

    public function show(Note $Note)
    {
        return $Note;
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = Note::validate();

        // Create the new post
        Note::create($validatedData);

        // Assuming the model was successfully saved
        return response()->json(['Note' => 'success', 'message' => __('datatable.added_successfully')]);
    }

    public function update(Note $Note)
    {
        // Validate
        $validatedData = Note::validate($Note);

        // Update
        $Note->update($validatedData);

        // Response
        return response()->json(['Note' => 'success', 'message' => __('datatable.edit_successfully')]);
    }

    public function destroy(Request $request)
    {
        // IDs
        $ids = $request->input('ids', []);

        // Abort if auth()->user() is in the IDs
        if(in_array(auth()->user()->id, $ids)){
            return response()->json(['Note' => 'error', 'message' => __('messages.unauthorized_action')], 500);
        }

        // Delete based on the provided IDs
        Note::whereIn('id', $ids)->delete();

        // Response
        return response()->json(['Note' => 'success', 'message' => __('datatable.added_successfully'),]);
    }
}
