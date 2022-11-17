<?php

namespace App\Services\User;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\Media\MediaService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

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
     * @param  User  $user
     * @return UserResource
     */
    public function get(User $user) {
        return new UserResource($user);
    }

    /**
     * Get resource index from the database
     * @param $query
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index($data)
    {
        $query = User::query();
        if (!empty($data['search'])) {
            $query = $query->search($data['search']);
        }
        if (!empty($data['sort_by']) && !empty($data['sort'])) {
            $query = $query->orderBy($data['sort_by'], $data['sort']);
        }
        return UserResource::collection($query->paginate(10));
    }

    /**
     * Creates resource in the database
     * @param  array  $data
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model|null
     */
    public function create(array $data)
    {
        $data = $this->clean($data);

        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $data['email_verified_at'] = Carbon::now()->toDateTimeString();
        $avatar = null;
        if (isset($data['avatar'])) {
            $avatar = $data['avatar'];
            unset($data['avatar']);
        }
        $record = User::query()->create($data);
        if (!empty($record)) {
            if (!empty($avatar)) {
                $entry = $this->mediaService->storeAvatar($avatar, $record);
                if (!empty($entry)) {
                    $record->update(['avatar_id' => $entry->id]);
                }
            }
            return $record->fresh();
        } else {
            return null;
        }
    }

    /**
     * Updates resource in the database
     * @param  User|Model  $user
     * @param  array  $data
     * @return bool
     */
    public function update(User $user, array $data)
    {
        $data = $this->clean($data);

        if (empty($data['password'])) {
            unset($data['password']);
        } else {
            $data['password'] = bcrypt($data['password']);
        }

        if (isset($data['avatar']) && $data['avatar']) {
            $entry = $this->mediaService->storeAvatar($data['avatar'], $user);
            if ($entry) {
                $data['avatar_id'] = $entry->id;
                if ($entry->avatar) {
                    $entry->avatar->delete(); // Delete old avatar.
                }
            }
            unset($data['avatar']);
        }
        return $user->update($data);
    }

    /**
     * Deletes resource in the database
     * @param  User|Model  $user
     * @return bool
     */
    public function delete(User $user)
    {
        return $user->delete();
    }

    /**
     * Clean the data
     * @param  array  $data
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
}
