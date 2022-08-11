<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        if ($this->getCurrentUser()->isAdmin()) {
            return UserResource::collection(User::paginate(10));
        }

        return response()->json(["message" => "Forbidden"], 403);
    }

    /**
     *  Display the specified resource.
     *
     * @param  User  $user
     *
     * @return UserResource|\Illuminate\Http\JsonResponse
     */
    public function show(User $user)
    {
        if ($this->getCurrentUser()->isAdmin()) {
            return new UserResource($user);
        }

        return response()->json(["message" => "Forbidden"], 403);
    }

    /**
     * Returns the current user
     * @return User|\Illuminate\Contracts\Auth\Authenticatable|null
     */
    protected function getCurrentUser()
    {
        return Auth::check() ? Auth::user() : null;
    }
}
