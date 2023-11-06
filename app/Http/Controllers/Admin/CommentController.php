<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index()
    {
        $datatable = Comment::datatable();

        // Ajax datatable request
        if (request()->ajax())
            return datatables()->of($datatable->Selection())->make();

        // Default datatable view
        return view('admin.layouts.datatable', ['datatable' => $datatable]);
    }

    public function show(Comment $Comment)
    {
        return $Comment;
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = Comment::validate();

        // Create the new post
        Comment::create($validatedData);

        // Assuming the model was successfully saved
        return response()->json(['status' => 'success', 'message' => __('datatable.added_successfully')]);
    }

    public function update(Comment $Comment)
    {
        // Validate
        $validatedData = Comment::validate($Comment);

        // Update
        $Comment->update($validatedData);

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
        Comment::whereIn('id', $ids)->delete();

        // Response
        return response()->json(['status' => 'success', 'message' => __('datatable.added_successfully'),]);
    }
}
