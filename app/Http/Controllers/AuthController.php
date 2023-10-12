<?php

namespace App\Http\Controllers;

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
                message: "Whoops! Something went wrong.",
                status_code: 422
            );
        }

        try {
            return response()->api(
                data: User::create($validator->validate()),
                message: "User registered successfully"
            );

        } catch (\Exception $e) {
            // Handle registration error
            return response()->json(['message' => 'Registration failed. ' . $e->getMessage()], 500);
        }

    }

    public function login(Request $request)
    {
        // ... (same as previous example)
    }
}
