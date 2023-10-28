<?php

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


Route::get('{any}', function () {


    $accept = explode(',', request()->header('accept'));
    if(in_array('text/html', $accept))
    {
        session()->forget('token');
        session()->regenerateToken();

        $user = auth()->user();
        if($user)
        $user = new UserResource($user);
        return view('welcome', compact(['user']));
    }
    else
        abort(500);

})->where('any', '.*');



