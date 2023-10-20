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
        }])->withCount('games')
            ->where('slug', $slug)
            ->firstOrFail();

        $total_pages = ceil($protection->games_count / 12);
        $next_page = 2;
        $next_page_url = null;
        if(request()->query('page'))
            $next_page = request()->query('page') + 1;

        if($next_page > $total_pages)
            $next_page = null;

        if($next_page)
            $next_page_url = route('api.protection', $slug).'?page='.$next_page;

        return response()->api(
            data: [
                'name' => $protection->name,
                'games' => GameResource::collection($protection->games),
                'games_count' => $protection->games_count,
                'last_page' => $total_pages,
                'next_page_url' => $next_page_url,
            ],
            message: $protection->name.__(" Games")
        );
    }

}
