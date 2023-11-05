<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function showLoginForm(Request $request)
    {
        if (Auth::check())
            return redirect()->route('admin.dashboard');

        return view('admin.auth.login');
    }
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // Check if the 'remember_me' checkbox is checked
        $remember = $request->has('remember_me');

        if (Auth::attempt($credentials, $remember)) {
            // Check if the user has a non-null role_id
            if (!is_null(Auth::user()->role_id)) {
                // Authentication passed
                return redirect()->route('admin.dashboard'); // Redirect to the dashboard or the desired route after successful login
            } else {
                // Authentication failed due to null role_id
                Auth::logout(); // Log the user out
                return redirect()->back()->withInput()->withErrors([
                    'invalid_credentials' => __('validation.invalid_credentials')
                ]);
            }
        } else {
            // Authentication failed
            return redirect()->back()->withInput()->withErrors([
                'invalid_credentials' => __('validation.invalid_credentials')
            ]);
        }
    }


    public function logout()
    {
        // Logout the user
        if(Auth::check())
            Auth::logout();

        return redirect()->route('admin.login'); // Redirect to the login page
    }
}
