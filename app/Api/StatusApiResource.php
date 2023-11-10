<?php

namespace App\Api;


class StatusApiResource extends ApiResource
{
    protected function resource($model): array
    {
        return [
            'name' => $model['name'],
        ];
    }

}
