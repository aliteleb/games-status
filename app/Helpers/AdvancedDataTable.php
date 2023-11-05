<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Model;
use ReflectionClass;

class AdvancedDataTable
{
    public Model $instance;
    public string $model;
    public string $name = "";
    public string $table_name = "table";
    public array $columns = [];
    public array $extra_selection = [];
    public bool $select_all_fields = false;
    public array $appends = [];
    public array $modal_fields = [];
    public array $actions = [];
    public array $buttons = [];
    public string $add_method = "modal";
    public bool $multiselect = true;
    public bool $add = true;
    public bool $custom_table = false;
    public bool $delete = true;
    public bool $bulk_edit = false;
    public string $route = "";

    public function __construct($model, $options = [])
    {
        $this->instance = new $model;
        $this->model = $model;
        $this->name = $this->table_name = $this->instance->getTable();
        $this->route = route('admin.' . $this->name . '.index');

        // Check options
        foreach ($options as $option_name => $option){
            $this->{$option_name} = $option;
        }

        // For multi datatable
        if(isset($options['$suffix']))
            $this->table_name .= $options['$suffix'] !== 0 ? $options['$suffix'] : '';
    }

    public function Selection($orders = ['id' => 'desc']): mixed
    {
        // Create a new instance of the model and get its table name
        $datatable = $this->model::datatable();
        $table = $this->instance->getTable();

        // Initialize arrays for fillable, appends, relations, and selection
        $fillable = [];
        $appends = [];
        $relations = [];
        $selection = [];
        $extra_selection = $datatable->extra_selection ?? [];

        // Create a reflection class for the model
        $reflectionClass = new ReflectionClass($this->model);

        // If the model has a fillable property, get its default values
        if ($reflectionClass->hasProperty('fillable'))
            $fillable = $reflectionClass->getDefaultProperties()['fillable'];

        // If the model has an appends property, get its default values
        if ($reflectionClass->hasProperty('appends'))
            $appends = $reflectionClass->getDefaultProperties()['appends'];

        // Add the id column to the selection array
        $selection[] = $table . '.id';

        // Loop through the columns defined in the datatable method of the model
        foreach ($this->model::datatable()->columns as $column) {
            // If the column contains a dot, it is a relation column
            if (str_contains($column, '.')) {

                // Add the relation to the relations array
                $relation = explode('.', $column)[0];
                $relations[] = $relation;

                // Add the foreign key column to the selection array
                $selection[] = $table . '.' . $this->instance->$relation()->getForeignKeyName();

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
            $relatedModel = $this->instance->$relation()->getRelated();

            // Get Model table name
            $tableName = $relatedModel->getTable();

            foreach ($this->model::datatable()->columns as $column) {

                $data = explode('.', $column);
                if (count($data) > 0 && $data[0] == $relation) {

                    $relations_queries[$relation] = function ($query) use ($tableName, $data) {
                        $query->select($tableName . '.id', $tableName . '.' . $data[1]);
                    };

                }
            }

        }

        // Return the selection of data from the model with any relations loaded
        $query = $this->model::with($relations_queries)->select($selection);

        // Get only result that has the relations

        /*foreach ($relations as $relations) {
            $query = $query->whereHas($relations);
        }*/

        // Get latest items by default
        if (request()->order == null){
            foreach ($orders as $column => $direction){
                $query = $query->orderBy($table . '.' . $column, $direction);
            }
        }

        // Final optimized query
        return $query;
    }
}
