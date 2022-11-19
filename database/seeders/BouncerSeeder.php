<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

use Bouncer;
use App\Models\MediaFile;

class BouncerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Bouncer::allow('admin')->everything();
        Bouncer::allow('regular')->toOwn(MediaFile::class)->to(['list', 'view', 'create', 'edit', 'delete']);
        Bouncer::allow('regular')->to('edit-profile', User::class);
    }
}
