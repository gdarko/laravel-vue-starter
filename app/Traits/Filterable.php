<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait Filterable
{

    /**
     * Filters a query by key:value parameters
     *
     * @param  Builder  $query
     * @param  array  $data
     * @param  string  $operator
     * @return Builder
     */
    public function scopeFilter(Builder $query, array $data, string $operator = 'AND')
    {
        $operator = strtoupper($operator);
        $callbacks = [
            'AND_WHERE' => 'where',
            'AND_WHERE_IN' => 'whereIn',
            'OR_WHERE' => 'orWhere',
            'OR_WHERE_IN' => 'orWhereIn',
        ];
        foreach ($data as $column => $value) {
            $filterParts = self::parseFilter($value);
            if (empty($filterParts)) {
                continue;
            }
            $comparison = $filterParts[1];
            $inputVal = $filterParts[2];
            if (is_array($inputVal)) {
                call_user_func_array([$query, $callbacks[$operator.'_WHERE_IN']], [$column, $inputVal]);
            } else {
                if (!is_numeric($inputVal)) {
                    $comparison = 'LIKE';
                    $inputVal = "%".$inputVal."%";
                }
                call_user_func_array([$query, $callbacks[$operator.'_WHERE']], [$column, $comparison, $inputVal]);
            }
        }

        return $query;
    }

    /**
     * Parse the filter
     * @param $value
     * @return array|string|string[]
     */
    public static function parseFilter($value)
    {
        $filterParts = explode(';', $value);
        $totalFilterParts = count($filterParts);
        if ($totalFilterParts !== 3) {
            return [];
        }
        $value = $filterParts[$totalFilterParts - 1];
        if (strpos($value, '|') !== false) {
            $filterParts[$totalFilterParts - 1] = explode('|', $value);
        }
        return $filterParts;
    }
}
