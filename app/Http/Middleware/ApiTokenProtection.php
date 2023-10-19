<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiTokenProtection
{


    public function handle(Request $request, Closure $next): Response
    {
        $session = session()->get('token');

        if(!$session){
            session()->put('token', base64_encode(csrf_token()));
            $session = session()->get('token');
        }

        $header = request()->header('token');
        if($session !== $header){
            abort(500);
        }

        session()->put('token', base64_encode(substr($session, 0, 64)));

        return $next($request);
    }
}
