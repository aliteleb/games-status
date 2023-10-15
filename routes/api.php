<?php

use App\Http\Controllers\Api\AuthController;
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

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/home', [HomeController::class, 'index'])->name('index');

Route::middleware(ApiAuthenticate::class)->group(function () {

    Route::get('/user', [AuthController::class, 'user'])->name('user');

});
