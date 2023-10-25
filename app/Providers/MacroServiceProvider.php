<?php

namespace App\Providers;

use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\ServiceProvider;

class MacroServiceProvider extends ServiceProvider
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
        ResponseFactory::macro('api', function ($status = 'success', $message = "", $status_code = 200, $data = [], $response_code = null) {

            $response = [
                'status' => $status,
                'message' => $message,
                'status_code' => $status_code,
                'data' => $data,
            ];

            if($response_code)
                return response()->json($response, $response_code);

            // usleep( 500000);
            return response()->json($response, $status_code);
        });
    }
}
