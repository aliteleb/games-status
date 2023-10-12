<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnvRedirectMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Force https
        if (str_starts_with($request->getHost(), 'www.')) {
            $redirectUrl = $request->getScheme() . '://' . substr($request->getHost(), 4) . $request->getRequestUri();
            return new RedirectResponse($redirectUrl, 301);
        } elseif ($request->getScheme() === 'http') {
            $redirectUrl = 'https://' . $request->getHost() . $request->getRequestUri();
            return new RedirectResponse($redirectUrl, 301);
        }
        return $next($request);
    }
}
