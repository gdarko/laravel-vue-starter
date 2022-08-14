<?php

namespace App\Enums;

class UserRole
{
    const REGULAR = 1;
    const ADMIN = 2;

    public static function all()
    {
        return [
            'admin'   => self::ADMIN,
            'regular' => self::REGULAR,
        ];
    }
}
