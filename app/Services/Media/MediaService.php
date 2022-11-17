<?php

namespace App\Services\Media;

use App\Models\MediaFile;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class MediaService
{
    /**
     * Handles a file upload to the storage
     * @param  UploadedFile  $file
     * @param  User|Model  $user
     * @return MediaFile|null|\Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model
     */
    public function storeAvatar(UploadedFile $file, User $user)
    {
        return $this->store($file, $user, 'public', 'avatars');
    }

    /**
     * Deletes a file
     * @param  MediaFile  $entry
     * @return bool
     */
    public function deleteMedia(MediaFile $entry)
    {
        $disk = Storage::disk($entry->disk);
        if ($disk->exists($entry->path) && $disk->delete($entry->path)) {
            return $entry->delete();
        }
        return false;
    }

    /**
     * Handles a file upload to the storage
     * @param  UploadedFile  $file
     * @param  User  $user
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model|null
     */
    public function storeMedia(UploadedFile $file, User $user)
    {
        return $this->store($file, $user, 'local', 'media');
    }

    /**
     * Handles a file upload to the storage
     * @param  UploadedFile  $file
     * @param  User  $user
     * @param $disk
     * @param $subdir
     * @return \Illuminate\Database\Eloquent\Builder|Model|null
     */
    public function store(UploadedFile $file, User $user, $disk, $subdir)
    {
        $name = $file->hashName();
        $dir = "{$subdir}/{$user->id}";
        $key = "{$dir}/{$name}";
        $path = $file->storeAs($dir, $name, ['disk' => $disk]);
        if (!$path) {
            return null;
        }
        return MediaFile::query()->create(
            attributes: [
                'name' => "{$name}",
                'file_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getClientMimeType(),
                'path' => $key,
                'disk' => $disk,
                'file_hash' => $file->hashName(),
                'collection' => null,
                'user_id' => $user->id,
                'size' => $file->getSize(),
            ],
        );
    }

}
