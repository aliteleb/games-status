<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

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



        return [
            'id' => $this->id,
            'title' => $this->name,
            'release_date' => $release_date,
            'crack_date' => $this->crack_date,
            'status_text' => $statusText,
            'days_diff' => $daysDifference,
            'image' => 'https://cdn.cloudflare.steamstatic.com/steam/apps/'.$this->steam_appid.'/header.jpg',

            // Include the related data
            'protections' => ProtectionResource::collection($this->whenLoaded('protections')),
            'groups' => GroupResource::collection($this->whenLoaded('groups')),

        ];
    }
}
