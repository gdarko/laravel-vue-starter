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
    public static function formatCollectionForSelect(Collection $collection, $value = 'id', $label = 'title')
    {
        return $collection->map(function ($entry) use ($value, $label) {
            return [
                'id' => isset($entry->$value) ? $entry->$value : null,
                'title' => isset($entry->$label) ? $entry->$label : null,
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
