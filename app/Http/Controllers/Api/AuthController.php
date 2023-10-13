<?php /** @noinspection ALL */

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|unique:users|string|max:16',
            'email' => 'required|string|email|unique:users|max:32',
            'password' => 'required|string|min:8|max:32|confirmed',
            'password_confirmation' => 'required|string|min:8|max:32',
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
            $user = User::create($validator->validate());
            return response()->api(
                data: new UserResource($user),
                message: __("User registered successfully.")
            );

        } catch (\Exception $e) {
            return response()->api(
                status: "error",
                message: __("An error occurred!."),
                status_code: 500
            );
        }

    }

    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {

            $user = Auth::user();
            return response()->api(
                data: new UserResource($user),
                message: __("Login successful.")
            );

        }

        // Authentication failed
        return response()->api(
            status: "error",
            message: __("Invalid credentials."),
            status_code: 401
        );
    }

    public function user(Request $request)
    {
        $user = auth()->user();
        return response()->api(
            data: new UserResource($user),
            message: __("Current user")
        );
    }
}
