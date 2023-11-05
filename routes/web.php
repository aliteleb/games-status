<?php

use App\Http\Controllers\LoginController;
use App\Http\Resources\GameResource;
use App\Models\Notification;
use Illuminate\Support\Facades\Route;
use \App\Http\Resources\UserResource;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


// Core routes
require_once "core.php";

// Wrap the routes with the 'guest' middleware
Route::middleware('guest')->prefix('/admin')->as('admin.')->group(function () {

    // Define routes for login functionality
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login'); // Display the login form
    Route::post('/login', [LoginController::class, 'login']); // Handle the login form submission

    // Logout
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout'); // Handle the logout action

});


Route::get('{any?}', function () {
    $accept = explode(',', request()->header('accept'));
    if(in_array('text/html', $accept))
    {
        session()->forget('token');
        session()->regenerateToken();

        $user = auth()->user();
        if($user)
        $user = new UserResource($user);

        $notifications = Notification::latest_notifications();

        return view('welcome', compact(['user', 'notifications']));
    }
    else
        abort(500);

})->where('any', '.*')->name('website');



