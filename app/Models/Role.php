<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Silber\Bouncer\Database\Role as BaseRole;

class Role extends BaseRole
{
    use HasFactory;
    use Searchable;

    protected $searchFields = ['name', 'title'];
}
