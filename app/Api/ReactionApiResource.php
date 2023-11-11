<?php

namespace App\Api;


class ReactionApiResource extends ApiResource
{
    protected function resource($model): array
    {
        return [
            'type' => $model['type'],
        ];
    }

}
