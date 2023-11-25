<?php

namespace App\Http\Middleware;

use App\Models\Role;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is not logged in ajax
        if (auth()->guest()) {
            if ($request->ajax())
                return new JsonResponse(['status_code' => 401, 'status' => 'error', 'error_message' => 'unauthenticated', 'message' => __('messages.unauthenticated'),], 401);
        }

        // Check if the user is logged in and has admin privileges
        if (!auth()->check())
            return redirect()->route('admin.login'); // Redirect to login page if not logged in

        // Determine the current controller and method being accessed
        $controller = str_replace('Controller', '', class_basename(Route::current()->controller));
        $method = Route::current()->getActionMethod();

        if($method === "create")
            $method = "store";
        if($method === "edit")
            $method = "update";

        $permission = $controller . '.' . $method; // Construct the permission string

        // Allow if no controller
        if($controller == "Redirect" || $controller == "Login")
            return $next($request);

        // Retrieve the user's role permissions from session
        $role = Role::with('permissions')->find(auth()->user()->role_id);

        // logout if he doesn't have roles
        if(!$role){
            return redirect()->route('website');
        }

        // Allow if role is super_user
        if($role->super_user)
            return $next($request);

        // Check if the user's role has the required permission
        if (request()->ajax() && !$role->hasPermission($permission))
            return new JsonResponse(['status_code' => 401, 'status' => 'error', 'error_message' => 'unauthorized_action', 'message' => __('messages.unauthorized_action_message'),], 401);
        else if (!$role->hasPermission($permission))
            return response()->view('admin.layouts.unauthorized'); // Show unauthorized view

        // If the user has the required permission, continue to the next middleware or route
        return $next($request);
    }


}
