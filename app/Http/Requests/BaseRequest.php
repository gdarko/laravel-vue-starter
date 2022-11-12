<?php

namespace App\Http\Requests;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class BaseRequest extends FormRequest
{
    /**
     * The required role
     * @var int
     */
    protected $requireRole = UserRole::ADMIN;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if (is_null($this->requireRole)) {
            return true;
        }

        /**
         * @var User $user
         */
        $user = $this->user();
        if (empty($user)) {
            return false;
        }

        return intval($user->role) === $this->requireRole;
    }

}
