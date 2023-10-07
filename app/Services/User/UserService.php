<?php

namespace App\Services\User;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\Media\MediaService;
use App\Traits\Filterable;
use App\Utilities\Data;
use Bouncer;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;

class UserService
{

    /**
     * The service instance
     * @var MediaService
     */
    protected $mediaService;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->mediaService = new MediaService();
    }

    /**
     * Get a single resource from the database
     *
     * @param  User  $user
     *
     * @return UserResource
     */
    public function get(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Get resource index from the database
     *
     * @param $query
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index($data)
    {
        $query = User::query();
        if (!empty($data['search'])) {
            $query = $query->search($data['search']);
        }
        if (!empty($data['filters'])) {
            $this->filter($query, $data['filters']);
        }
        if (!empty($data['sort_by']) && !empty($data['sort'])) {
            $query = $query->orderBy($data['sort_by'], $data['sort']);
        }

        return UserResource::collection($query->paginate(10));
    }

    /**
     * Creates resource in the database
     *
     * @param  array  $data
     *
     * @return Builder|Model|null
     * @throws FileDoesNotExist
     * @throws FileIsTooBig
     */
    public function create(array $data)
    {
        $data = $this->clean($data);

        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        $data['email_verified_at'] = Carbon::now()->toDateTimeString();
        $roles = Data::take($data, 'roles');
        $avatar = Data::take($data, 'avatar');

        $record = User::query()->create($data);
        if (!empty($record)) {
            // Set avatar
            if (!empty($avatar)) {
                $this->mediaService->replace($avatar, $record, 'avatars');
            }
            // Set roles
            if (!empty($roles)) {
                Bouncer::sync($record)->roles($roles);
            }

            return $record->fresh();
        } else {
            return null;
        }
    }

    /**
     * Updates resource in the database
     *
     * @param  User  $user
     * @param  array  $data
     *
     * @return bool
     * @throws FileDoesNotExist
     * @throws FileIsTooBig
     */
    public function update(User $user, array $data)
    {
        $data = $this->clean($data);

        if (empty($data['password'])) {
            unset($data['password']);
        } else {
            $data['password'] = bcrypt($data['password']);
        }

        $roles = Data::take($data, 'roles');

        unset($data['email']);

        if (isset($data['avatar']) && $data['avatar']) {
            $this->mediaService->replace($data['avatar'], $user, 'avatars');
        }

        if (!empty($roles)) {
            Bouncer::sync($user)->roles($roles);
        }

        return $user->update($data);
    }

    /**
     * Update avatar for the specified resource
     *
     * @param  User  $user
     * @param  array  $data
     *
     * @return bool
     */
    public function updateAvatar(User $user, array $data)
    {
        if (isset($data['avatar']) && $data['avatar']) {
            $this->mediaService->replace($data['avatar'], $user, 'avatars');
        }
        if (!empty($data)) {
            return $user->update($data);
        } else {
            return false;
        }
    }

    /**
     * Deletes resource in the database
     *
     * @param  User|Model  $user
     *
     * @return bool
     */
    public function delete(User $user)
    {
        return $user->delete();
    }

    /**
     * Clean the data
     *
     * @param  array  $data
     *
     * @return array
     */
    private function clean(array $data)
    {
        foreach ($data as $i => $row) {
            if ('null' === $row) {
                $data[$i] = null;
            }
        }

        return $data;
    }

    /**
     * Filter resources
     * @return void
     */
    private function filter(Builder &$query, $filters)
    {
        $query->filter(Arr::except($filters, ['role']));

        if (!empty($filters['role'])) {
            $roleFilter = Filterable::parseFilter($filters['role']);
            if (!empty($roleFilter)) {
                if (is_array($roleFilter[2])) {
                    $query->whereIs(...$roleFilter[2]);
                } else {
                    $query->whereIs($roleFilter[2]);
                }
            }
        }

    }
}
