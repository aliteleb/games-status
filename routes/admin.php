<?php

use App\Http\Controllers\Admin\{CommentController,
    DashboardController,
    GameController,
    GenreController,
    GroupController,
    MediaController,
    NoteController,
    ProtectionController,
    RoleController,
    SettingController,
    StatusController,
    UserController};
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
Route::resource('/games', GameController::class); // CRUD routes for protections
Route::resource('/protections', ProtectionController::class); // CRUD routes for protections
Route::resource('/groups', GroupController::class); // CRUD routes for groups
Route::resource('/genres', GenreController::class); // CRUD routes for genres
Route::resource('/statuses', StatusController::class); // CRUD routes for statuses
Route::resource('/comments', CommentController::class); // CRUD routes for comments
Route::resource('/notes', NoteController::class); // CRUD routes for notes
Route::resource('/media', MediaController::class)->parameters(['media' => 'media']); // CRUD routes for media
Route::resource('/users', UserController::class); // CRUD routes for users
Route::resource('/roles', RoleController::class); // CRUD routes for roles

// Settings Routes
Route::get('/settings', [SettingController::class, 'index'])->name('settings.index'); // Show settings form
Route::put('/settings', [SettingController::class, 'update'])->name('settings.update'); // Update settings

// Redirect to dashboard
Route::redirect('/', 'admin/dashboard');
