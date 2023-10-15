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

        $parsedDate = Carbon::parse($this->release_date);
        $statusText = '';

        if($this->crack_date == null)
            $statusText = 'UNCRACKED';
        else
            $statusText = 'CRACKED';

        if ($parsedDate->isFuture())
            $statusText = 'UNRELEASED';


        return [
            'id' => $this->id,
            'title' => $this->name,
            'release_date' => $this->release_date,
            'crack_date' => $this->crack_date,
            'statusText' => $statusText,

            // Include the related data
            'protections' => ProtectionResource::collection($this->whenLoaded('protections')),
            'groups' => GroupResource::collection($this->whenLoaded('groups')),

        ];
    }
}
