<?php

namespace App\Api;


use Carbon\Carbon;

class NotificationApiResource extends ApiResource
{
    protected function resource($model): array
    {

        return [
            'id' => $model['id'] ?? null,
            'type' => $model['type'] ?? null,
            'is_read' => $model['is_read'] ?? null,
            'from_user' => isset($model['from_user']) ? UserApiResource::parse($model['from_user']) : null,
            'game' => $model['game_info'] ?? null,
            'time' => Carbon::parse($model['created_at']?: null)->diffForHumans(),
            'comment' => isset($model['comment']) ? CommentApiResource::parse($model['comment']) : null,
        ];
    }

}
