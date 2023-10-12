<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|unique:users|string|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'password' => 'required|string|min:8',
            'country_code' => 'required|string|min:2|max:2',
        ]);

        if ($validator->fails()) {
            return response()->api(
                status: "error",
                data: $validator->errors(),
                message: __("Whoops! Something went wrong."),
                status_code: 422
            );
        }

        try {
            return response()->api(
                data: User::create($validator->validate()),
                message: __("User registered successfully.")
            );

        } catch (\Exception $e) {
            // Handle registration error
            return response()->api(
                status: "error",
                message: __("An error occurred!."),
                status_code: 500
            );
        }

    }

    public function login(Request $request)
    {
        return [];
    }
    public function user(Request $request)
    {
        return auth()->user();
    }
}
