<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use ReflectionClass;
use ReflectionMethod;

class RoleController extends Controller
{
    public function index()
    {
        // Datatable
        $datatable = Role::datatable();

        // Ajax datatable request
        if (request()->ajax()) {
            return datatables()->of($datatable->Selection())->make();
        }

        // Default datatable view
        return view('admin.layouts.datatable', ['datatable' => $datatable]);
    }

    public function create()
    {
        return view('admin.roles.create', ['role' => new Role, 'permissions' => $this->all_permissions()]);
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

            // Create a new role
            $role = Role::create(['name' => $request->input('name')]);

            // Assign permissions to the role
            foreach ($allowedPermissions as $permission => $status) {
                Permission::create([
                    'role_id' => $role->id,
                    'permission' => str_replace('_', '.', $permission)
                ]);
            }

            DB::commit(); // Commit the transaction

            return redirect()->route('admin.roles.index')
                ->with('success', __('datatable.added_successfully')); // Flash a success message

        } catch (\Exception $e) {
            DB::rollBack(); // Roll back the transaction in case of an exception

            return redirect()->back()
                ->with('error', __('datatable.process_error')); // Flash an error message
        }
    }

    public function edit(Role $role)
    {
        if(!$role->editable)
            return redirect()->route('admin.roles.index')
                ->with('error', __('messages.unauthorized_action')); // Flash a success message

        $role = Role::with('permissions')->find($role->id);
        return view('admin.roles.edit', ['role' => $role, 'permissions' => $this->all_permissions()]);
    }

    public function update(Request $request, Role $role)
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

        // Update role's name
        $role->name = $request->input('name');
        $role->save();

        // Delete existing permissions for the role
        Permission::where('role_id', $role->id)->delete();

        // Create new permissions for the role
        foreach ($allowedPermissions as $permission => $status) {
            Permission::create([
                'role_id' => $role->id,
                'permission' => str_replace('_', '.', $permission)
            ]);
        }

        // Redirect with a success message
        return redirect()->route('admin.roles.index')
            ->with('success', __('datatable.edit_successfully')); // Flash a success message
    }

    private function all_permissions(): array
    {
        $controllersExceptions = [];
        $methodsExceptions = ['edit', 'create'];
        $controllerArrays = [];

        // Exclude current controller `RoleController`
        $controllersExceptions[] = class_basename(Route::current()->controller);

        $controllerPath = app_path('Http/Controllers/Admin');
        $files = File::allFiles($controllerPath);

        foreach ($files as $file) {
            $filePath = $file->getPathname();
            $namespace = 'App\\';
            $class = $namespace . str_replace(
                    ['/', '.php'],
                    ['\\', ''],
                    Str::after($filePath, app_path() . DIRECTORY_SEPARATOR)
                );

            $reflection = new ReflectionClass($class);

            $class_base_name = class_basename($class);

            if (!in_array($class_base_name, $controllersExceptions)) {

                $class_base_name = str_replace('Controller', '', $class_base_name);

                $controllerArrays[$class_base_name] = [];

                $class_methods = $reflection->getMethods(ReflectionMethod::IS_PUBLIC);
                foreach ($class_methods as $method) {
                    if ($method->class === $class && $method->name !== '__construct') {

                        if (!in_array($method->name, $methodsExceptions)) {
                            $controllerArrays[$class_base_name][] = $class_base_name . '_' . $method->name;
                        }
                    }
                }
            }

        }

        return $controllerArrays;
    }

    public function destroy(Request $request)
    {
        // Check if any role is un editable
        $can_delete = Role::whereIn('id', $request->input('ids', []))->where('editable', 0)->count() == 0;
        if(!$can_delete)
            return response()->json(['status' => 'error', 'message' => __('messages.unauthorized_action')], 500);

        // Check if any users associated with the role
        $associated_users = User::whereIn('role_id', $request->input('ids', []))->count() > 0;
        if($associated_users)
            return response()->json(['status' => 'error', 'message' => __('messages.roles_associated_users_error')], 500);

        // Delete based on the provided IDs
        Role::whereIn('id', $request->input('ids', []))->delete();

        // Response
        return response()->json(['status' => 'success', 'message' => __('datatable.deleted_successfully')]);
    }

}
