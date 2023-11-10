<?php

namespace App\Http\Controllers\API;

use App\Api\GameApiResource;
use App\Api\ProtectionApiResource;
use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Protection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProtectionController extends Controller
{
    public function index(Request $request)
    {
        $result = DB::table('protections as dp')
            ->join(DB::raw('(SELECT gdp.drm_protection_id, MAX(gdp.game_id) as game_id FROM game_drm_protection gdp GROUP BY gdp.drm_protection_id) as lg'), 'dp.id', '=', 'lg.drm_protection_id')
            ->join('games as g', 'lg.game_id', '=', 'g.id')
            ->join(DB::raw('(SELECT protections.id as drm_id, COUNT(game_drm_protection.game_id) as games_count
                FROM protections
                JOIN game_drm_protection ON protections.id = game_drm_protection.drm_protection_id
                GROUP BY protections.id) as gc'), 'dp.id', '=', 'gc.drm_id')
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
        $protection = Protection::withCount('games')
            ->whereSlug($slug)
            ->firstOrFail();

        $games = Game::with('status:id,name')
            ->select(['id', 'name', 'slug','release_date', 'crack_date', 'steam_appid', 'header', 'game_status_id'])
            ->paginate(12);

        $protection->games = (new GameApiResource($games))->get();
        $protection = (new ProtectionApiResource($protection))->get();

        return response()->api(
            data: $protection,
            message: $protection['name'].__(" Games")
        );
    }

}
