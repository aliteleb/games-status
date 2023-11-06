<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Game;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class GameController extends Controller
{
    public function index()
    {
        // Datatable
        $datatable = Game::datatable();

        // Ajax datatable request
        if (request()->ajax()) {
            return datatables()->of($datatable->Selection())->make();
        }

        // Default datatable view
        return view('admin.layouts.datatable', ['datatable' => $datatable]);
    }

    public function create()
    {
        return view('admin.Games.create', ['Game' => new Game, 'permissions' => $this->all_permissions()]);
    }

    public function store(Request $request)
    {
        // Extract permissions from the request data
        $permissions = $request->except(['_token', 'name', '_method']);

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3',
        ]);

        // If validation fails, return back with errors and input
        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Convert permission values to boolean
        foreach ($permissions as $name => $permission) {
            $permissions[$name] = (bool) $permission;
        }

        // Filter allowed permissions that are true
        $allowedPermissions = collect(array_filter($permissions, function ($value) {
            return $value === true;
        }));

        try {
            DB::beginTransaction(); // Start a database transaction

            // Create a new Game
            $Game = Game::create(['name' => $request->input('name')]);

            // Assign permissions to the Game
            foreach ($allowedPermissions as $permission => $status) {
                Permission::create([
                    'Game_id' => $Game->id,
                    'permission' => str_replace('_', '.', $permission)
                ]);
            }

            DB::commit(); // Commit the transaction

            return redirect()->route('admin.Games.index')
                ->with('success', __('datatable.added_successfully')); // Flash a success message

        } catch (\Exception $e) {
            DB::rollBack(); // Roll back the transaction in case of an exception

            return redirect()->back()
                ->with('error', __('datatable.process_error')); // Flash an error message
        }
    }

    public function edit(Game $Game)
    {
        if(!$Game->editable)
            return redirect()->route('admin.Games.index')
                ->with('error', __('messages.unauthorized_action')); // Flash a success message

        $Game = Game::with('permissions')->find($Game->id);
        return view('admin.Games.edit', ['Game' => $Game, 'permissions' => $this->all_permissions()]);
    }

    public function update(Request $request, Game $Game)
    {
        // Extract permissions from the request data
        $permissions = $request->except(['_token', 'name', '_method']);

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3',
        ]);

        // If validation fails, return back with errors and input
        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Convert permission values to boolean
        foreach ($permissions as $name => $permission) {
            $permissions[$name] = (bool) $permission;
        }

        // Filter allowed permissions that are true
        $allowedPermissions = collect(array_filter($permissions, function ($value) {
            return $value === true;
        }));

        // Update Game's name
        $Game->name = $request->input('name');
        $Game->save();

        // Delete existing permissions for the Game
        Permission::where('Game_id', $Game->id)->delete();

        // Create new permissions for the Game
        foreach ($allowedPermissions as $permission => $status) {
            Permission::create([
                'Game_id' => $Game->id,
                'permission' => str_replace('_', '.', $permission)
            ]);
        }

        // Redirect with a success message
        return redirect()->route('admin.Games.index')
            ->with('success', __('datatable.edit_successfully')); // Flash a success message
    }

    public function destroy(Request $request)
    {
        // Check if any Game is un editable
        $can_delete = Game::whereIn('id', $request->input('ids', []))->where('editable', 0)->count() == 0;
        if(!$can_delete)
            return response()->json(['status' => 'error', 'message' => __('messages.unauthorized_action')], 500);

        // Check if any users associated with the Game
        $associated_users = User::whereIn('Game_id', $request->input('ids', []))->count() > 0;
        if($associated_users)
            return response()->json(['status' => 'error', 'message' => __('messages.Games_associated_users_error')], 500);

        // Delete based on the provided IDs
        Game::whereIn('id', $request->input('ids', []))->delete();

        // Response
        return response()->json(['status' => 'success', 'message' => __('datatable.deleted_successfully')]);
    }
}
