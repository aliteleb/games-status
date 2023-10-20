<?php /** @noinspection ALL */

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiAuthenticate
{
    public function handle(Request $request, Closure $next)
    {
        if(!auth()->check())
        {

            return response()->api(
                status: "error",
                message: __("You must login to do this action"),
                status_code: 401,
                response_code: 200
            );
        }

        return $next($request);
    }
}
