<?php

namespace App\Api;


use Carbon\Carbon;

class CommentApiResource extends ApiResource
{
    protected function resource($model): array
    {
        Carbon::setLocale('en');
        $time = null;
        if(isset($model['created_at']))
            $time = Carbon::parse($model['created_at'])->diffForHumans();

        return [
            'id' => $model['id'] ?? null,
            'user_id' => $model['user_id'] ?? null,
            'game_id' => $model['game_id'] ?? null,
            'body' => $model['body'] ?? null,
            'reply_to' => $model['reply_to'] ?? null,
            'reactions_count' => $model['reactions_count'] ?? 0,
            'time' => $time,
            'username' => $model['username'] ?? null,
            'display_name' => $model['display_name'] ?? null,
            'user_image' => $model['user_image'] ?? null,
            'votes' => $model['votes'] ?? null,
            'voted' => $model['voted'] ?? null,
            'user' => isset($model['user']) ? UserApiResource::parse($model['user']) : null,
            'replies' => isset($model['replies']) ? CommentApiResource::parse($model['replies']) : null,
        ];
    }

}
