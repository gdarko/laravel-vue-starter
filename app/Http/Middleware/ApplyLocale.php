<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApplyLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $locale = $request->header('X-Locale');
        if(!empty($locale)) {
            app()->setLocale($locale);
        }
        return $next($request);
    }
}
