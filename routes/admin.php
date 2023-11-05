<?php

use App\Http\Controllers\Admin\{DashboardController, MediaController, RoleController, SettingController, UserController};
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "admin" middleware group. Make something great!
|
*/


// Basic Routes
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

// Resource Routes
Route::resource('/users', UserController::class); // CRUD routes for users
Route::resource('/roles', RoleController::class); // CRUD routes for roles
Route::resource('/protections', RoleController::class); // CRUD routes for roles
Route::resource('/media', MediaController::class)->parameters(['media' => 'media']); // CRUD routes for media

// Settings Routes
Route::get('/settings', [SettingController::class, 'index'])->name('settings.index'); // Show settings form
Route::put('/settings', [SettingController::class, 'update'])->name('settings.update'); // Update settings

// Redirect to dashboard
Route::redirect('/', 'admin/dashboard');
