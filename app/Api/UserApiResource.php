<?php

namespace App\Api;


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
            'avatar' => Storage::disk('media')->url('images/users/avatars/'.$model['avatar']) ?? null,

        ];
    }

}
