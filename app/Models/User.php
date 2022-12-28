<?php

namespace App\Models;

use App\Traits\Filterable;
use App\Traits\Searchable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\HasApiTokens;
use Silber\Bouncer\Database\HasRolesAndAbilities;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    use HasRolesAndAbilities;

    use Searchable, Filterable;

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
        'full_name',
    ];

    /**
     * Bootstrap the model and its traits.
     *
     * @return void
     */
    public static function boot()
    {
        parent::boot();

        static::deleting(function (self $record) {
            Log::info('Deleting user...');
            Log::info(json_encode($record->mediaFiles));
            Log::info(json_encode($record->mediaFiles()->get()));
            foreach ($record->mediaFiles()->get() as $entry) {
                $entry->delete();
            }
        });
    }

    /**
     * Returns the user avatar
     * @return \Illuminate\Database\Eloquent\Relations\HasOne|MediaFile
     */
    public function avatar()
    {
        return $this->hasOne(MediaFile::class, 'id', 'avatar_id');
    }

    /**
     * Returns the user files
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function mediaFiles()
    {
        return $this->hasMany(MediaFile::class, 'user_id', 'id');
    }

    /**
     * Returns the avatar url attribute
     * @return string|null
     */
    public function getAvatarUrlAttribute()
    {
        $src = $this->getAttribute('avatar_id');
        if (is_null($src)) {
            return null;
        }
        if (!empty($this->avatar)) {
            return asset('storage/'.$this->avatar->path);
        }
        return null;
    }

    /**
     * Returns the full_name attribute
     * @return string
     */
    public function getFullNameAttribute()
    {
        $names = [];
        foreach (['first_name', 'middle_name', 'last_name'] as $key) {
            $value = $this->getAttribute($key);
            if (!empty($value)) {
                $names[] = $value;
            }
        }
        return implode(' ', $names);
    }

    /**
     * Returns the is_admin attribute
     * @return bool
     */
    public function getIsAdminAttribute()
    {
        return $this->isAn('admin');
    }
}
