<?php

namespace App\Utilities;

use Illuminate\Support\Collection;

class Data
{
    /**
     * Formats collection for select field
     *
     * @param  Collection  $collection
     * @param $value
     * @param $label
     * @return Collection
     */
    public static function formatCollectionForSelect(Collection $collection, $value = 'id', $label = 'trans')
    {
        return $collection->map(function ($entry) use ($value, $label) {
            $id = $entry->$value ?? null;
            $label = $label === 'trans' ? trans('frontend.users.roles.'.$id) : ( $entry->$label ?? $entry->$id );
            return [
                'id' => $id,
                'title' => $label,
            ];
        });
    }


    /**
     * Take value form array
     * @param $arr
     * @param $key
     * @return mixed|null
     */
    public static function take(&$arr, $key)
    {
        if (isset($arr[$key])) {
            $value = $arr[$key];
            unset($arr[$key]);
            return $value;
        }
        return null;
    }
}
