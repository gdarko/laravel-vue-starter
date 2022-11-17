<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class MediaFile extends Model
{
    use HasFactory;

    protected $table = 'media';
    protected $guarded = ['id'];

    /**
     * Bootstrap the model and its traits.
     *
     * @return void
     */
    public static function boot()
    {
        parent::boot();

        static::deleting(function (self $record) {
            $disk = Storage::disk($record->disk);
            if ($disk->exists($record->path)) {
                $disk->delete($record->path);
            }
        });
    }
}
