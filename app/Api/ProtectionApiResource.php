<?php

namespace App\Api;


class ProtectionApiResource extends ApiResource
{
    protected function resource($model): array
    {
        return [
            'id' => $model['id'] ?? null,
            'name' => $model['name'] ?? null,
            'slug' => $model['slug'] ?? null,
            'games' => $model['games'] ?? null,
            'games_count' => $model['games_count'] ?? null,
        ];
    }

}
