<?php

namespace App\Api;


class ProtectionApiResource extends ApiResource
{
    protected function resource($model): array
    {
        return [
            'id' => $model->id,
            'name' => $model->name,
            'slug' => $model->slug,
            'games' => $model->games,
            'games_count' => $model->games_count,
        ];
    }

}
