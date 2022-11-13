<?php

namespace App\Models;

use App\Enums\UserRole;
use App\Traits\Searchable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail {
    use HasApiTokens, HasFactory, Notifiable;

    use Searchable;

    /**
     * ALlowed search fields
     * @var string[]
     */
    protected $searchFields = ['first_name', 'last_name', 'middle_name', 'email'];

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array<string>|bool
     */
    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'avatar_url',
    ];

    /**
     * Is the user administrator
     *
     * @return bool
     */
    public function isAdmin(): bool {
        return UserRole::ADMIN === (int) $this->getAttribute( 'role' );
    }

    /**
     * Returns the user messages
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function messages() {
        return $this->hasMany( Message::class );
    }

    /**
     * Returns the avatar url attribute
     * @return string|null
     */
    public function getAvatarUrlAttribute() {
        $src = $this->getAttribute( 'avatar' );
        if ( is_null( $src ) ) {
            return null;
        }

        return asset( $src );
    }

    /**
     * Return list of roles
     * @return array
     */
    public static function roles() {
        return [
            UserRole::ADMIN   => trans( 'frontend.users.roles.admin' ),
            UserRole::REGULAR => trans( 'frontend.users.roles.regular' ),
        ];
    }
}
