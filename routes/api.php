<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Middleware\ApiAuthenticate;
use Illuminate\Http\Request;
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
Route::get('/protections', [GameController::class, 'protections'])->name('protections');

# Under Auth
Route::middleware(ApiAuthenticate::class)->group(function () {

    Route::get('/user', [AuthController::class, 'user'])->name('user');
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::post('/games/{game_id}/follow', [GameController::class, 'follow'])->name('game.follow');
    Route::post('/games/{game_id}/unfollow', [GameController::class, 'unfollow'])->name('game.follow');

});
