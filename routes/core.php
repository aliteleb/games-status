<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

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


Route::get('/public/{filename}', function ($filename) {

    $path = public_path($filename);

    if (!file_exists($path)) {
        abort(404);
    }

    $fileExtension = pathinfo($path, PATHINFO_EXTENSION);

    // Determine content type based on file extension
    $contentType = config('constants.mime_types')[$fileExtension] ?? 'application/octet-stream';

    $headers = [
        'Cache-Control' => 'private, max-age=36000',
        'Content-Type' => $contentType,
    ];

    $fileContents = file_get_contents($path);

    return Response::make($fileContents, 200, $headers);
})->where('filename', '.*');

