<?php

namespace App\Api;

use App\Http\Resources\StatusResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class GameApiResource extends ApiResource
{
    protected function resource($model)
    {
        $data = [
            'id' => $model['id'],
            'name' => $model['name'],
            'slug' => $model['slug'],
            'release_date' => $model['release_date'],
            'crack_date' => $model['crack_date'],
            'header' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/' . $model['steam_appid'] . '/capsule_616x353.jpg',
            'poster' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/' . $model['steam_appid'] . '/library_600x900.jpg',
            'cover' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/' . $model['steam_appid'] . '/library_hero.jpg',
            'game_status_id' => $model['game_status_id'],
            'followers_count' => $model['followers_count'] ?? null,
            'comments' => $model['comments'] ?? null,
            'status_text' => $model['status']['name'],
            'days_diff' => 0,
            'protections' => ProtectionApiResource::parse(isset($model['protections']) ? collect($model['protections']) : null),
            'groups' => GroupApiResource::parse(isset($model['groups']) ? collect($model['groups']) : null),
            'status' => StatusApiResource::parse($model['status'] ?: null),
        ];

        if (isset($model['header']))
            $data['header'] = Storage::disk('media')->url('/images/games/headers/' . $model['header']);

        if (isset($model['cover']))
            $data['cover'] = Storage::disk('media')->url('/images/games/covers/' . $model['cover']);

        if (isset($model['poster']))
            $data['poster'] = Storage::disk('media')->url('/images/games/posters/' . $model['poster']);

        if (isset($model->status))
            $data['status'] = StatusApiResource::parse($model->status);

        if (isset($data['status']))
            $data['status_text'] = $data['status']['name'] ?? null;

        $user = auth()->user();
        $is_following = false;
        if ($user)
            $is_following = $user->following->contains($model['id']);

        $data['is_following'] = $is_following;

        try {
            $release_date = Carbon::parse($model['release_date']);
            $crack_date = Carbon::parse($model['crack_date']);

            if (Carbon::parse($release_date)->isFuture())
                $data['status_text'] = "UNRELEASED";

            $daysDifference = $crack_date->diffInDays($release_date);

            if ($model['crack_date'] == null)
                $daysDifference = now()->diffInDays($release_date);

            $data['days_diff'] = $daysDifference;
            $data['release_date'] = $release_date->format('M d, Y');
            $data['crack_date'] = $crack_date->format('M d, Y');

            if($model['crack_date'] == null)
                $data['crack_date'] = "TBD";
        }
        catch (\Exception){
            $data['days_diff'] = null;
            $data['release_date'] = null;
            $data['crack_date'] = null;
        }

        return $data;
    }

}
