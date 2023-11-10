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
            'id' => $model->id,
            'name' => $model->name,
            'slug' => $model->slug,
            'release_date' => $model->release_date,
            'crack_date' => $model->crack_date,
            'steam_appid' => $model->steam_appid,
            'header' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/' . $model->steam_appid . '/header.jpg',
            'poster' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/' . $model->steam_appid . '/library_600x900.jpg',
            'cover' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/' . $model->steam_appid . '/library_hero.jpg',
            'game_status_id' => $model->game_status_id,
            'followers_count' => $model->followers_count,
            'comments' => $model->comments,
            'status_text' => $model->status->name,
            'days_diff' => 0,
            'is_following' => $model->is_following,
            'protections' => $model->protections,
            'groups' => $model->groups,
            'status' => $model->status,
        ];

        if ($model->header)
            $data['header'] = Storage::disk('media')->url('/images/games/headers/' . $model->header);

        if ($model->cover)
            $data['cover'] = Storage::disk('media')->url('/images/games/covers/' . $model->cover);

        if ($model->poster)
            $data['poster'] = Storage::disk('media')->url('/images/games/posters/' . $model->poster);

        if (isset($model->status))
            $data['status'] = new StatusResource($model->status);

        if (isset($data['status']))
            $data['status_text'] = $data['status']->name ?? null;

        try {
            $release_date = Carbon::parse($model->release_date);
            $crack_date = Carbon::parse($model->crack_date);

            if (Carbon::parse($release_date)->isFuture())
                $data['status_text'] = "UNRELEASED";

            $daysDifference = $crack_date->diffInDays($release_date);

            if ($model->crack_date == null)
                $daysDifference = now()->diffInDays($release_date);

            $data['days_diff'] = $daysDifference;
            $data['release_date'] = $release_date->format('M d, Y');
            $data['crack_date'] = $crack_date->format('M d, Y');
        }
        catch (\Exception){
            $data['days_diff'] = null;
            $data['release_date'] = null;
            $data['crack_date'] = null;
        }

        return $data;
    }

}
