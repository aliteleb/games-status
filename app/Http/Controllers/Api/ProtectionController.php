<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;
use App\Models\DrmProtection;
use Illuminate\Support\Carbon;
use function Symfony\Component\String\u;

class ProtectionController extends Controller
{
    public function protection($slug)
    {
        $protection = DrmProtection::with(['games'=> function ($query) {
            return $query->paginate(12);
        }])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->api(
            data: [
                'name' => $protection->name,
                'games' => GameResource::collection($protection->games)
            ],
            message: $protection->name.__(" Games")
        );
    }

}
