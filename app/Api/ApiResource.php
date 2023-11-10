<?php

namespace App\Api;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

abstract class ApiResource
{
    protected mixed $result = null;
    protected array $hidden = [];
    protected mixed $data;

    function __construct($data, $hidden = [])
    {
        $this->data = $data;
        $this->hidden = $hidden;

        if ($this->data instanceof Collection) {
            if ($this->data)
                $this->result = $this->collect();
        } else if ($this->data instanceof LengthAwarePaginator) {
            if ($this->data)
                $this->result = $this->paginate();
        } else {
            if ($this->data) {
                if (is_array($this->data)) {
                    $result = $this->resource($this->data);
                    $this->result = $this->removeHidden($result);
                } else {
                    $result = $this->resource($this->data->toArray());
                    $this->result = $this->removeHidden($result);
                }
            }
        }
    }

    protected function resource($model)
    {
        return $this->removeHidden($model);
    }

    private function removeHidden($model): array
    {
        $model0 = array_filter($model, function ($value) {
            return $value !== null;
        });

        foreach ($this->hidden as $prop) {
            unset($model[$prop]);
        }
        return $model;
    }

    function collect(): array
    {
        $data = [];
        foreach ($this->data as $model) {
            if (is_array($model)) {
                $result = $this->resource($model);
                $data[] = $this->removeHidden($result);
            } else {
                $result = $this->resource($model->toArray());
                $data[] = $this->removeHidden($result);
            }
        }
        return $data;
    }

    function paginate()
    {
        $data = [];
        foreach ($this->data->items() as $model) {
            if (is_array($model)) {
                $result = $this->resource($model);
                $data[] = $this->removeHidden($result);
            } else {
                $result = $this->resource($model->toArray());
                $data[] = $this->removeHidden($result);
            }

        }
        $this->result = $data;
        $data = $this->data->toArray();
        $data['data'] = $this->result;
        return $data;
    }

    public function get()
    {
        return $this->result;
    }
}
