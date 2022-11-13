<?php

namespace App\Http\Controllers;

use App\Http\Requests\DestroyUserRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Http\Resources\UserResource;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Carbon\Carbon;
use Exception;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return JsonResponse|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        if ($this->getCurrentUser()->isAdmin()) {

            $query  = User::query();
            $search = $request->get('search');
            if ( ! empty($search)) {
                $query = $query->search($search);
            }
            $sort_by = $request->get('sort_by');
            $sort    = $request->get('sort');
            if ($sort && $sort_by) {
                $query = $query->orderBy($sort_by, $sort);
            }

            return UserResource::collection($query->paginate(10));
        }

        return response()->json(["message" => "Forbidden"], 403);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return JsonResponse|\Illuminate\Http\Response
     */
    public function create()
    {
        return response()->json(['properties' => $this->properties()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreUserRequest  $request
     *
     * @return JsonResponse
     */
    public function store(StoreUserRequest $request)
    {

        $data                      = $request->only(['first_name', 'last_name', 'middle_name', 'email', 'role', 'avatar', 'password']);
        $data['password']          = bcrypt($data['password']);
        $data['email_verified_at'] = Carbon::now()->toDateTimeString();

        $record = User::create($data);

        if (is_null($record)) {
            $response_data = ['message' => trans('frontend.global.phrases.record_not_created')];
            $response_code = 501;
        } else {
            $response_data = ['message' => trans('frontend.global.phrases.record_created'), 'record' => $record];
            $response_code = 200;
        }

        return response()->json($response_data, $response_code);
    }

    /**
     * Stores the Avatar
     *
     * @param  Request  $request
     *
     * @return UserResource|JsonResponse
     */
    public function store_avatar(Request $request)
    {
        try {
            $user         = $request->user();
            $fileName     = 'avatars/'.$user->id;
            $filePath     = Storage::putFile($fileName, $request->file, 'public');
            $user->avatar = $filePath;
            if ($user->save()) {
                $response_data = [
                    'message' => trans('frontend.global.phrases.record_updated'), 'record' => new UserResource($user)
                ];
                $response_code = 200;
            } else {
                throw new \Exception('Error updating method.');
            }
        } catch (Exception $exception) {
            $response_data = ['message' => trans('frontend.global.phrases.record_not_updated')];
            $response_code = 409;
        }

        return response()->json($response_data, $response_code);
    }

    /**
     *  Show the form for editing the specified resource.
     *
     * @param  User  $user
     *
     * @return UserResource|JsonResponse
     */
    public function show(User $user)
    {
        if ($this->getCurrentUser()->isAdmin()) {
            return new UserResource($user);
        }

        return response()->json(["message" => "Forbidden"], 403);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  User  $user
     *
     * @return JsonResponse|\Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return response()->json(['model' => $user, 'properties' => $this->properties()]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateUserRequest  $request
     * @param  User  $user
     *
     * @return JsonResponse
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->only(['first_name', 'last_name', 'middle_name', 'email', 'role']);
        if ( ! empty($request->get('password'))) {
            $data['password'] = bcrypt($request->get('password'));
        }
        if ( ! empty($request->get('avatar'))) {
            $data['avatar'] = bcrypt($request->get('avatar'));
        }

        if ($user->update($data)) {
            $response_data = [
                'message' => trans('frontend.global.phrases.record_updated'), 'record' => new UserResource($user)
            ];
            $response_code = 200;
        } else {
            $response_data = ['message' => trans('frontend.global.phrases.record_not_updated')];
            $response_code = 409;
        }

        return response()->json($response_data, $response_code);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     *
     * @return JsonResponse
     */
    public function destroy(DestroyUserRequest $request, User $user)
    {
        $response_data = null;
        $responde_code = null;
        if ($user->delete()) {
            $response_data = ['message' => trans('frontend.global.phrases.record_created'), 'record' => $user];
            $responde_code = 200;
        }

        return response()->json($response_data, $responde_code);

    }

    /**
     * Render properties
     * @return array
     */
    public function properties()
    {
        return [
            'roles' => User::roles()
        ];
    }
}
