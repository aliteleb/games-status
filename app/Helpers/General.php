<?php

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Jenssegers\Agent\Agent;

/**
 * @param $keys
 * @param $array
 * @return bool
 */
function in_array_keys($keys, $array): bool
{
    foreach ($keys as $key) {
        if (array_key_exists($key, $array)) {
            return true;
        }
    }

    return false;
}

function settings($key)
{
    return config('settings.' . $key);
}

/**
 * This function returns a selection of data from a given model.
 *
 * @param string $model The name of the model to select data from.
 * @return mixed The selection of data from the model.
 * @throws ReflectionException
 */
function datatable_selection($model): mixed
{
    // Create a new instance of the model and get its table name
    $instance = new $model;
    $datatable = $model::datatable();
    $table = $instance->getTable();

    // Initialize arrays for fillable, appends, relations, and selection
    $fillable = [];
    $appends = [];
    $relations = [];
    $selection = [];
    $extra_selection = $datatable->extra_selection ?? [];

    // Create a reflection class for the model
    $reflectionClass = new ReflectionClass($model);

    // If the model has a fillable property, get its default values
    if ($reflectionClass->hasProperty('fillable'))
        $fillable = $reflectionClass->getDefaultProperties()['fillable'];

    // If the model has an appends property, get its default values
    if ($reflectionClass->hasProperty('appends'))
        $appends = $reflectionClass->getDefaultProperties()['appends'];

    // Add the id column to the selection array
    $selection[] = $table . '.id';

    // Loop through the columns defined in the datatable method of the model
    foreach ($model::datatable()->columns as $column) {
        // If the column contains a dot, it is a relation column
        if (str_contains($column, '.')) {

            // Add the relation to the relations array
            $relation = explode('.', $column)[0];
            $relations[] = $relation;

            // Add the foreign key column to the selection array
            $selection[] = $table . '.' . $instance->$relation()->getForeignKeyName();

        }
        else
            // Add the column to the selection array
            if (!in_array($column, $appends))
                $selection[] = $table . '.' . $column;
    }

    // Include extra columns
    foreach ($extra_selection as $field) {
        $selection[] = $table . '.' . $field;
    }

    // If select_all_fields is (true) then select everything
    if ($datatable->select_all_fields) {
        foreach ($fillable as $field) {
            $selection[] = $table . '.' . $field;
        }
        $selection = array_unique($selection);
    }

    // Relation queries to get only the columns we need
    $relations_queries = [];
    foreach ($relations as $relation) {

        // Get the related model instance
        $relatedModel = $instance->$relation()->getRelated();

        // Get Model table name
        $tableName = $relatedModel->getTable();

        foreach ($model::datatable()->columns as $column) {

            $data = explode('.', $column);
            if (count($data) > 0 && $data[0] == $relation) {

                $relations_queries[$relation] = function ($query) use ($tableName, $data) {
                    $query->select($tableName . '.id', $tableName . '.' . $data[1]);
                };

            }
        }

    }

    // Return the selection of data from the model with any relations loaded
    $query = $model::with($relations_queries)->select($selection);

    // Get only result that has the relations

    /*foreach ($relations as $relations) {
        $query = $query->whereHas($relations);
    }*/

    // Get latest items by default
    if (request()->order == null)
        $query = $query->orderBy($table . '.' . 'id', 'desc');

    // Final optimized query
    return $query;
}

function without_accessors($model): Collection
{
    return collect($model->getAttributes())->except($model->getHidden());
}

// Validation helper
/**
 * Validate the given rules against the request data.
 *
 * @param array  $rules  The validation rules.
 * @param Model  $model  The model instance for updating (if applicable).
 *
 * @return array  The validated data.
 */
function validate_rules($rules, $model, $request): array
{
    // Check if the request method is 'put'
    if (request()->isMethod('put')) {

        foreach ($rules as $name => $rule) {

            // Replace 'required' with 'nullable' for put requests
            // $rules[$name] = str_replace('required', 'nullable', $rule);

            // Exclude current $model in unique rule on update
            if (str_contains($rules[$name], 'unique')) {
                $rule_parts = explode('|', $rules[$name]);
                $new_rule = '';

                foreach ($rule_parts as $part) {
                    if (str_contains($part, 'unique')) {
                        // Append the model's ID to the unique rule
                        $part .= ',' . $model->id;
                    }

                    $new_rule .= $part . '|';
                }

                $rules[$name] = $new_rule;
            }
        }
        // End foreach

    }
    // End put


    // Request params
    $requestData = collect($request)->except('_token')->toArray();

    // Replace boolean values to 0,1
    foreach ($requestData as &$value) {
        $value = ($value == 'true') ? '1' : (($value == 'false') ? '0' : $value);
    }

    // Replace nulls with empty strings
    /*
    $requestData = array_map(function ($param) {
        return is_null($param) ? '' : $param;
    }, $requestData);
    */

    // Filter out empty values based on hidden attributes
    if($model){
        $requestData = array_filter($requestData, function ($value, $param) use ($model) {
            return !in_array($param, $model->getHidden()) || !empty($value);
        }, ARRAY_FILTER_USE_BOTH);

        // Remove hidden or empty fields from validation rules
        $rules = array_filter($rules, function ($value, $param) use ($model) {
            return !in_array($param, $model->getHidden()) || !empty($requestData[$param]);
        }, ARRAY_FILTER_USE_BOTH);
    }

    // Validate and return the cleaned data using Laravel's Validator
    return Validator::make($requestData, $rules)->validate();
}


function storage($disk, $url)
{
    return Storage::disk($disk)->url($url);
}
function media_file($media, $size = 'medium')
{
    if($media == null)
        return '';

    return storage('media', 'images/'.$size.'/'.$media->file);
}

function get_file_name($path)
{
    $parts = explode('/', $path);
    return $parts[count($parts) - 1];
}

function pick_random_item($items){
    $randomKey = array_rand($items);
    return $items[$randomKey];
}

function isMobile()
{
    $agent = new Agent();
    return $agent->isMobile();
}
