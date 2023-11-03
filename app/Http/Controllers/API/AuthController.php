<?php /** @noinspection ALL */

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
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
        try {
            $user = User::create($data);

            // Retrieve the uploaded files
            $avatar = $request->file('avatar');
            $file_name = pathinfo($avatar->getClientOriginalName(), PATHINFO_FILENAME);
            $file_save_name = $file_name . '.webp';

            // Profile avatar
            Image::make($avatar)->encode('webp', 100)->resize(100, null, function ($constraint) {
                $constraint->aspectRatio();
            })->save(public_path('assets/images/users/100/' . $user->id . '.webp'));
            // Comments avatar
            Image::make($avatar)->encode('webp', 50)->resize(50, null, function ($constraint) {
                $constraint->aspectRatio();
            })->save(public_path('assets/images/users/50/' . $user->id . '.webp'));

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
            message: __("Invalid username or password"),
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

    public function logout(Request $request)
    {
        sleep(1);
        auth()->logout();
        return response()->api([
            'message' => __('Logout successful.'),
        ]);
    }

}
