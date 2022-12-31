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
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'middle_name' => 'nullable|string|max:100',
            'email' => 'required|email|unique:users,email,'.$this->request->get('email').',email|max:200',
            'roles' => 'required|array|exists:roles,name',
            'avatar' => 'nullable|image',
            'password' => 'nullable|min:6'
        ];
    }

}
