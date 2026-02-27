<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Register any application services.
     */
    public function register(): void
    {

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->bootAuth();
        $this->bootRoute();
    }

    public function bootAuth()
    {
        ResetPassword::createUrlUsing(function ($user, string $token) {
            return env('APP_URL').'/reset-password?token='.$token;
        });
    }

    public function bootRoute()
    {
        RateLimiter::for('login', function (Request $request) {
            return Limit::perMinute(10);
        });
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(30);
        });
    }
}
