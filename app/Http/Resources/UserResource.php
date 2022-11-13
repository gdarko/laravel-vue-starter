<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class UserResource
 * @package App\Http\Resources
 */
class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'first_name'    => $this->first_name,
            'last_name'     => $this->last_name,
            'middle_name'   => $this->middle_name,
            'name'          => sprintf('%s %s', $this->first_name, $this->last_name),
            'full_name'     => sprintf('%s %s', $this->first_name, $this->last_name),
            'email'         => $this->email,
            'avatar'        => $this->avatar,
            'avatar_url'    => $this->avatar_url,
            'isAdmin'       => $this->isAdmin(),
            'emailVerified' => $this->email_verified_at,
            'role'          => $this->role,
            'original'      => $this->toArray($request)
        ];
    }
}
