<?php

namespace App\Exceptions;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        // 404
        if (env('APP_ENV', 'local') == 'production') {
            if ($request->wantsJson() && $exception instanceof ModelNotFoundException) {
                return response()->api(status: 'error', message: 'object not found', status_code: 404);
            }

            // any other exception
            if ($request->wantsJson() && $exception instanceof \Exception) {
                return response()->api(status: 'error', message: 'internal server error', status_code: 500);
            }
        }
        return parent::render($request, $exception);
    }
}
