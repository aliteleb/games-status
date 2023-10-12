<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiAuthenticate
{
    public function handle(Request $request, Closure $next)
    {
        if(!auth()->check())
        {

            return response()->api('error', 'Unauthenticated.', 401);
        }

        return $next($request);
    }
}
