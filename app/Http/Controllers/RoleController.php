<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Services\Role\RoleService;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * The service instance
     * @var RoleService
     */
    protected $roleService;

    /**
     * Constructor
     * @param  RoleService  $service
     */
    public function __construct(RoleService $service)
    {
        $this->roleService = $service;
    }

    /**
     * Handle search data
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     * @throws AuthorizationException
     */
    public function search(Request $request)
    {
        $this->authorize('search', Role::class);
        return $this->roleService->index($request->all());
    }
}
