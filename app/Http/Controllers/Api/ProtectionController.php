<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;
use App\Models\DrmProtection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProtectionController extends Controller
{
    public function index(Request $request)
    {
        $result = DB::table('drm_protections as dp')
            ->join(DB::raw('(SELECT gdp.drm_protection_id, MAX(gdp.game_id) as game_id FROM game_drm_protection gdp GROUP BY gdp.drm_protection_id) as lg'), 'dp.id', '=', 'lg.drm_protection_id')
            ->join('games as g', 'lg.game_id', '=', 'g.id')
            ->join(DB::raw('(SELECT drm_protections.id as drm_id, COUNT(game_drm_protection.game_id) as games_count
                FROM drm_protections
                JOIN game_drm_protection ON drm_protections.id = game_drm_protection.drm_protection_id
                GROUP BY drm_protections.id) as gc'), 'dp.id', '=', 'gc.drm_id')
            ->where('g.type', 'game')
            ->select('dp.id as protection_id', 'dp.name as protection_name', 'dp.slug as protection_slug', 'gc.games_count',
                'lg.game_id as game_id', 'g.name as game_name', 'g.slug as game_slug')
            ->paginate(12);

        // Iterate through the results and construct the 'game' object.
        foreach ($result as $item) {
            $item->id = $item->protection_id;
            $item->name = $item->protection_name;
            $item->slug = $item->protection_slug;
            $games_count = $item->games_count;
            unset($item->games_count);
            $item->games_count = $games_count;
            $item->last_game = [
                'id' => $item->game_id,
                'name' => $item->game_name,
                'slug' => $item->game_slug,
            ];
            unset($item->game_id, $item->game_name, $item->game_slug, $item->protection_id, $item->protection_name, $item->protection_slug);
        }

        return response()->api(
            data: $result,
            message: __("Protections")
        );

    }

    public function show($slug)
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
