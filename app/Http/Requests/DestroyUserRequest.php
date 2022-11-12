<?php

namespace App\Http\Requests;

use App\Enums\UserRole;
use App\Models\User;

class DestroyUserRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [

        ];
    }

}
