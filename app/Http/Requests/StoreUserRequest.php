<?php

namespace App\Http\Requests;

use App\Models\User;

class StoreUserRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'     => 'required|string|max:200',
            'email'    => 'required|email|unique:users',
            'role'     => 'required|numeric|in:'.implode(',', array_keys(User::roles())),
            'avatar'   => 'nullable|image',
            'password' => 'required|min:6',
        ];
    }
}
