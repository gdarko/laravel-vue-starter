<?php

namespace App\Services\Role;

use App\Http\Resources\RoleResource;
use App\Models\Role;

class RoleService
{

    /**
     * Get resource index from the database
     * @param $query
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index($data)
    {
        $query = Role::query();
        $per_page = isset($data['per_page']) && is_numeric($data['per_page']) ? intval($data['per_page']) : 10;

        if (!empty($data['search'])) {
            $query = $query->search($data['search']);
        }
        if (!empty($data['sort_by']) && !empty($data['sort'])) {
            $query = $query->orderBy($data['sort_by'], $data['sort']);
        }
        return RoleResource::collection($query->paginate($per_page));
    }

}
