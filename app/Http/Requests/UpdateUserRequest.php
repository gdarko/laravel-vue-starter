<?php

namespace App\Http\Requests;

use App\Models\User;

class UpdateUserRequest extends BaseRequest
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
            'email'    => 'required|email|max:200|unique:users,email,'.$this->get('id').',id',
            'role'     => 'required|integer|in:'.implode(',', array_keys(User::roles())),
            'avatar'   => 'nullable|image',
            'password' => 'nullable|min:6'
        ];
    }

}
