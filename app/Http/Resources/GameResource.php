<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

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

        if($this->crack_date == null){
            $statusText = 'UNCRACKED';
            $daysDifference = now()->diffInDays($release_date);
        }
        else
            $statusText = 'CRACKED';

        if ($release_date->isFuture())
            $statusText = 'UNRELEASED';

        $user = auth()->user();
        $is_following = false;
        if($user)
            $is_following = auth()->user()->following->contains($this->id);

        return [
            'id' => $this->id,
            'title' => $this->name,
            'slug' => $this->slug,
            // 'release_date' => $release_date,
            // 'crack_date' => $this->crack_date,
            'status_text' => $statusText,
            'days_diff' => $daysDifference,
            'image' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/'.$this->steam_appid.'/header.jpg',
            'header' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/' . $this->steam_appid . '/header.jpg',
            'poster' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/' . $this->steam_appid . '/library_600x900.jpg',
            'cover' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/' . $this->steam_appid . '/library_hero.jpg',
            'is_following' => $is_following
            // 'protections' => ProtectionResource::collection($this->whenLoaded('protections')),
            // 'groups' => GroupResource::collection($this->whenLoaded('groups')),

        ];
    }
}
