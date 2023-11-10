<?php

namespace App\Api;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

abstract class ApiResource
{
    protected mixed $result = [];
    protected array $hidden = [];
    protected mixed $data;

    function __construct($data, $hidden = [])
    {
        $this->data = $data;
        $this->hidden = $hidden;

        if ($this->data instanceof Collection) {
            $this->result = $this->collect();
        } else if ($this->data instanceof LengthAwarePaginator) {
            $this->result = $this->paginate();
        } else {
            $this->result = $this->resource($this->data);
        }
    }

    protected function resource($model)
    {
        return $this->removeHidden($model);
    }

    private function removeHidden($model)
    {
        foreach ($this->hidden as $prop) {
            unset($model[$prop]);
        }
        return $model;
    }

    function collect(): array
    {
        $data = [];
        foreach ($this->data as $game) {
            $data[] = $this->resource($game);
        }
        return $data;
    }
    function paginate()
    {
        $data = [];
        foreach ($this->data->items() as $game) {
            $data[] = $this->resource($game);
        }
        $this->result = $data;
        $data = $this->data->toArray();
        $data['data'] = $this->result;
        return $data;
    }
    public function get()
    {
        return $this->removeHidden($this->result);
    }
}
