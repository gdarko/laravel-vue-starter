<?php

namespace App\Http\Requests;

class UpdateAvatarRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'avatar' => 'required|image',
        ];
    }
}
