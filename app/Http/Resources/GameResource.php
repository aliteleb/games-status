<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class GameResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $release_date = Carbon::parse($this->release_date);
        $crack_date = Carbon::parse($this->crack_date);
        $daysDifference = $crack_date->diffInDays($release_date);

        if ($this->crack_date == null)
            $daysDifference = now()->diffInDays($release_date);

        $user = auth()->user();
        $is_following = false;
        if ($user)
            $is_following = auth()->user()->following->contains($this->id);

        $data = [
            'id' => $this->id,
            'title' => $this->name,
            'slug' => $this->slug,
            'days_diff' => $daysDifference,
            'image' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/' . $this->steam_appid . '/header.jpg',
            'header' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/' . $this->steam_appid . '/header.jpg',
            'poster' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/' . $this->steam_appid . '/library_600x900.jpg',
            'cover' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/' . $this->steam_appid . '/library_hero.jpg',
            'is_following' => $is_following,
            'protections' => ProtectionResource::collection($this->whenLoaded('protections')),
            'groups' => GroupResource::collection($this->whenLoaded('groups')),
            'status' => new StatusResource($this->whenLoaded('status')),
        ];

        if ($this->header)
            $data['header'] = Storage::disk('media')->url('/images/games/headers/' . $this->header);

        if ($this->cover)
            $data['header'] = Storage::disk('media')->url('/images/games/covers/' . $this->header);

        if ($this->poster)
            $data['header'] = Storage::disk('media')->url('/images/games/posters/' . $this->header);

        if (isset($this->resource->getRelations()['status']))
            $data['status'] = new StatusResource($this->resource->getRelations()['status']);

        if (isset($data['status']))
            $data['status_text'] = $data['status']->name ?? null;

        if (Carbon::parse($this->release_date)->isFuture())
            $data['status_text'] = "UNRELEASED";

        return $data;
    }
}
