<?php

namespace App\Api;


use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class UserApiResource extends ApiResource
{
    protected function resource($model): array
    {

        return [
            'username' => $model['username'] ?? null,
            'display_name' => $model['display_name'] ?? null,
            'email' => $model['email'] ?? null,
            'gender' => $model['gender'] ?? null,
            'country_code' => $model['country_code'] ?? null,
            'avatar' => Storage::disk('media')->url('images/users/avatars/'.($model['avatar'] ?? '')) ?? null,
            'games' => GameApiResource::parse($model['games'] ?? null),
            'member_since' => isset($model['created_at']) ? Carbon::parse($model['created_at'])->diffForHumans() : null,

        ];
    }

}
