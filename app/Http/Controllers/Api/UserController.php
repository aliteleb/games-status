<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function show($username)
    {
        $user = User::select(['id', 'username'])
            ->with('games', function ($query) {
                return $query->paginate(12);
            })
            ->withCount('games')
            ->where('username', $username)
            ->firstOrFail();

        $games = $user->games;
        unset($user->games);
        $user->games = GameResource::collection($games);
        unset($user->following);

        $total_pages = ceil($user->games_count / 12);
        $next_page = 2;
        $next_page_url = null;
        if (request()->query('page'))
            $next_page = request()->query('page') + 1;

        if ($next_page > $total_pages)
            $next_page = null;

        if ($next_page)
            $next_page_url = route('api.user') . '/' . $username . '?page=' . $next_page;

        $user->last_page = $total_pages;
        $user->next_page_url = $next_page_url;

        return response()->api(
            data: $user,
            message: $user->username . __(" Profile")
        );

    }

    public function updatePassword(Request $request)
    {
        $user = Auth::user();

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string|min:8|max:32',
            'new_password' => 'required|string|min:8|max:32',
            'new_password_confirmation' => 'required|string|min:8|max:32|same:new_password',
        ]);

        if ($validator->fails()) {
            return response()->api(
                status: "error",
                data: $validator->errors(),
                message: __("Whoops! Something went wrong."),
                status_code: 422
            );
        }

        // Check if the current password is correct
        if (!Hash::check($request->input('current_password'), $user->password)) {
            $validator->errors()->add('current_password', 'The current password is incorrect');
        }

        // Update the user's password
        $user->password = $request->input('new_password');
        $user->save();

        return response()->api(
            data: $user,
            message: __('Password changed successfully')
        );
    }

    public function updateEmail(Request $request)
    {
        $user = Auth::user();

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|string|min:5|max:32|unique:users,email,' . $user->id,
        ]);

        if ($validator->fails()) {
            return response()->api(
                status: "error",
                data: $validator->errors(),
                message: __("Whoops! Something went wrong."),
                status_code: 422
            );
        }

        // Update the user's email
        $user->email = $request->input('email');
        $user->save();

        return response()->api(
            data: $user,
            message: __('Email changed successfully')
        );
    }
}
