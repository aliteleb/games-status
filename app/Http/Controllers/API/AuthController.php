<?php /** @noinspection ALL */

namespace App\Http\Controllers\API;

use App\Api\NotificationApiResource;
use App\Api\UserApiResource;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Media;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|unique:users|string|min:3|max:16',
            'email' => 'required|string|email|unique:users|min:5|max:32',
            'password' => 'required|string|min:8|max:32|confirmed',
            'password_confirmation' => 'required|string|min:8|max:32|same:password',
            'gender' => 'required|in:male,female',
            'country_code' => 'required|string|min:2|max:2',
            'avatar' => 'required|image|mimes:jpeg,png,gif,webp,svg|max:1000'
        ]);

        if ($validator->fails()) {
            return response()->api(
                status: "error",
                data: $validator->errors(),
                message: __("Whoops! Something went wrong."),
                status_code: 422
            );
        }
        $data = $validator->validate();

        // Retrieve the uploaded files
        $avatar = $request->file('avatar');

        $avatar = Media::uploadFile(file: $request->file('avatar'), path: "/images/users/avatars/", size: [200, 200]);

        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => $data['password'],
            'gender' => $data['gender'],
            'country_code' => $data['country_code'],
            'avatar' => $avatar,
        ]);

        return response()->api(
            data: UserApiResource::parse($user),
            message: __("User registered successfully.")
        );

    }

    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {

            $user = Auth::user();
            $user = UserApiResource::parse($user);
            $user['notifications'] = Notification::latest_notifications();
            return response()->api(
                data: $user,
                message: __("Login successful.")
            );

        }

        // Authentication failed
        return response()->api(
            status: "error",
            message: __("Invalid username or password"),
            status_code: 401
        );
    }

    public function user(Request $request)
    {
        $user = auth()->user();
        return response()->api(
            data: UserApiResource::parse($user),
            message: __("Current user")
        );
    }

    public function logout(Request $request)
    {
        sleep(1);
        auth()->logout();
        return response()->api([
            'message' => __('Logout successful.'),
        ]);
    }

}
