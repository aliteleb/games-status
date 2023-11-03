<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

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

    public function update(Request $request)
    {
        sleep(1);
        $user = Auth::user();

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|min:3|max:16|unique:users,username,' . $user->id,
            'country_code' => 'required|string|min:2|max:2',
            'display_name' => 'required|string|min:3|max:255',
        ]);

        if ($validator->fails()) {
            return response()->api(
                status: "error",
                data: $validator->errors(),
                message: __("Whoops! Something went wrong."),
                status_code: 422
            );
        }

        // Update the user's information
        $user->username = $request->input('username');
        $user->display_name = $request->input('display_name');
        $user->country_code = $request->input('country_code');

        $user->save();

        return response()->api(
            data: $user,
            message: __('Information updated successfully')
        );
    }
    public function updatePassword(Request $request)
    {
        sleep(1);
        $user = Auth::user();

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string|min:8|max:32',
            'new_password' => 'required|string|min:8|max:32',
            'new_password_confirmation' => 'required|string|min:8|max:32|same:new_password',
        ]);

        // Check if the current password is correct
        if (!Hash::check($request->input('current_password'), $user->password)) {
            $validator->errors()->add('current_password', 'The current password is incorrect');
            return response()->api(
                status: "error",
                data: $validator->errors(),
                message: __("Whoops! Something went wrong."),
                status_code: 422
            );
        }

        if ($validator->fails()) {
            return response()->api(
                status: "error",
                data: $validator->errors(),
                message: __("Whoops! Something went wrong."),
                status_code: 422
            );
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
        sleep(1);
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
    public function updateAvatar(Request $request)
    {
        $user = Auth::user();

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'avatar' => 'required|image|mimes:jpeg,png,gif,webp,svg|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->api(
                status: "error",
                data: $validator->errors(),
                message: __("Whoops! Something went wrong."),
                status_code: 422
            );
        }

        // Retrieve the uploaded files
        $avatar = $request->file('avatar');

        // Profile avatar
        Image::make($avatar)->encode('webp', 100)->resize(100, null, function ($constraint) {
            $constraint->aspectRatio();
        })->save(public_path('assets/images/users/100/' . $user->id . '.webp'));
        // Comments avatar
        Image::make($avatar)->encode('webp', 50)->resize(50, null, function ($constraint) {
            $constraint->aspectRatio();
        })->save(public_path('assets/images/users/50/' . $user->id . '.webp'));

        return response()->api(
            data: $user,
            message: __('Avatar changed successfully')
        );
    }
}
