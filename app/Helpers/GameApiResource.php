<?php

namespace App\Helpers;

use App\Http\Resources\StatusResource;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class GameApiResource
{
    protected array $result = [];
    protected array $hidden = [];
    protected $data;

    function __construct($data, $hidden = [])
    {
        $this->data = $data;
        $this->hidden = $hidden;

        $this->init();
    }

    private function init()
    {
        $data = [];
        if ($this->data instanceof Collection) {
            foreach ($this->data as $game) {
                $data[] = $this->handel($game);
            }
            $this->result = $data;
        } else if ($this->data instanceof LengthAwarePaginator) {
            foreach ($this->data->items() as $game) {
                $data[] = $this->handel($game);
            }
            $this->result = $data;
            $data = $this->data->toArray();
            $data['data'] = $this->result;
            $this->result = $data;
        } else {
            $this->result = $this->handel($this->data);
        }

    }

    private function handel($game)
    {
        $data = [
            'id' => $game->id,
            'name' => $game->name,
            'slug' => $game->slug,
            'release_date' => $game->release_date,
            'crack_date' => $game->crack_date,
            'steam_appid' => $game->steam_appid,
            'header' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/' . $game->steam_appid . '/header.jpg',
            'poster' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/' . $game->steam_appid . '/library_600x900.jpg',
            'cover' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/' . $game->steam_appid . '/library_hero.jpg',
            'game_status_id' => $game->game_status_id,
            'followers_count' => $game->followers_count,
            'comments' => $game->comments,
            'status_text' => $game->status->name,
            'days_diff' => 0,
            'is_following' => $game->is_following,
            'protections' => $game->protections,
            'groups' => $game->groups,
            'status' => $game->status,
        ];

        if ($game->header)
            $data['header'] = Storage::disk('media')->url('/images/games/headers/' . $game->header);

        if ($game->cover)
            $data['cover'] = Storage::disk('media')->url('/images/games/covers/' . $game->cover);

        if ($game->poster)
            $data['poster'] = Storage::disk('media')->url('/images/games/posters/' . $game->poster);

        if (isset($game->status))
            $data['status'] = new StatusResource($game->status);

        if (isset($data['status']))
            $data['status_text'] = $data['status']->name ?? null;

        if (Carbon::parse($game->release_date)->isFuture())
            $data['status_text'] = "UNRELEASED";

        $release_date = Carbon::parse($game->release_date);
        $crack_date = Carbon::parse($game->crack_date);
        $daysDifference = $crack_date->diffInDays($release_date);

        if ($game->crack_date == null)
            $daysDifference = now()->diffInDays($release_date);

        $data['days_diff'] = $daysDifference;
        $data['release_date'] = $release_date->format('M d, Y');
        $data['crack_date'] = $crack_date->format('M d, Y');

        return $this->removeHidden($data);
    }

    private function removeHidden($game)
    {
        foreach ($this->hidden as $prop) {
            unset($game[$prop]);
        }

        return $game;
    }

    public function get()
    {
        return $this->result;
    }

}
