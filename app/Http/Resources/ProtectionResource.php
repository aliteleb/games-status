<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProtectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'games' => GameResource::collection($this->whenLoaded('games')),
        ];

        // Check if 'games_count' exists before adding it to the array
        if ($this->games_count !== null) {
            $data['games_count'] = $this->games_count;
        }

        return $data;
    }
}
