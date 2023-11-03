<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\GameController;
use App\Http\Controllers\API\GroupController;
use App\Http\Controllers\API\HomeController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\API\ProtectionController;
use App\Http\Controllers\API\UserController;
use App\Http\Middleware\ApiAuthenticate;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

# Auth routes
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');

# Basic routes
Route::get('/home', [HomeController::class, 'index'])->name('home.index');
Route::post('/games', [GameController::class, 'index'])->name('games');
Route::get('/game/{slug}', [GameController::class, 'show'])->name('game');

Route::get('/protections', [ProtectionController::class, 'index'])->name('protections');
Route::get('/protection/{slug}', [ProtectionController::class, 'show'])->name('protection');

Route::get('/groups', [GroupController::class, 'index'])->name('groups');
Route::get('/group/{slug}', [GroupController::class, 'show'])->name('group');

Route::get('/user/{username}', [UserController::class, 'show'])->name('user');

# Under Auth
Route::middleware(ApiAuthenticate::class)->group(function () {

    Route::get('/user', [AuthController::class, 'user'])->name('user');
    Route::put('/user/update', [UserController::class, 'update'])->name('user.update');
    Route::post('/user/password/update', [UserController::class, 'updatePassword'])->name('user.password.update');
    Route::post('/user/email/update', [UserController::class, 'updateEmail'])->name('user.email.update');
    Route::post('/user/avatar/update', [UserController::class, 'updateAvatar'])->name('user.avatar.update');
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::post('/games/{game_id}/follow', [GameController::class, 'follow'])->name('game.follow');
    Route::post('/games/{game_id}/unfollow', [GameController::class, 'unfollow'])->name('game.follow');

    Route::post('/comments/create', [CommentController::class, 'store'])->name('comment.store');
    Route::post('/comment/vote', [CommentController::class, 'vote'])->name('comment.vote');
    Route::delete('/comment/delete/{id}', [CommentController::class, 'delete'])->name('comment.delete');

    Route::get('/notifications', [NotificationController::class, 'getNotifications'])->name('notifications.index');
    Route::post('/notifications/{notification}', [NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');

});
