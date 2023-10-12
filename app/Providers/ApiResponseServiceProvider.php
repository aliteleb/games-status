<?php

namespace App\Providers;

use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\ServiceProvider;

class ApiResponseServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        ResponseFactory::macro('api', function ($status = 'success', $data = null, $message = "", $statusCode = 200) {
            $response = [
                'status' => $status,
                'data' => $data,
                'status_code' => $statusCode,
                'message' => $message,
            ];

            return response()->json($response, $statusCode);
        });
    }
}
