<?php

namespace App\Http\Responses;

use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Laravel\Fortify\Fortify;

class LoginResponse implements LoginResponseContract
{

    /**
     * @param  $request
     *
     * @return mixed
     */
    public function toResponse($request)
    {
        return $request->wantsJson()
            ? response()->json(['user' => Auth::user()])
            : redirect()->intended(Fortify::redirects('login'));
    }

}
