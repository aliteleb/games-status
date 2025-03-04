<?php

namespace App\Http\Controllers\API;

use App\Api\GameApiResource;
use App\Api\GroupApiResource;
use App\Api\ProtectionApiResource;
use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GroupController extends Controller
{
    public function index(Request $request)
    {
        $result = DB::table('groups')
            ->select([
                'groups.id as id',
                'groups.name as name',
                'groups.slug as slug',
                'gc.games_count as games_count',
                'last_game.game_id as last_game',
                'games.id as game_id',
                'games.name as game_name',
                'games.slug as game_slug',
            ])
            ->join(DB::raw('(SELECT game_group.group_id, MAX(game_group.game_id) AS game_id FROM game_group GROUP BY game_group.group_id) as last_game'), function ($join) {
                $join->on('groups.id', '=', 'last_game.group_id');
            })
            ->join('games', 'last_game.game_id', '=', 'games.id')
            ->join(DB::raw('(SELECT `groups`.id AS drm_id, COUNT(game_group.game_id) AS games_count FROM `groups` JOIN game_group ON `groups`.id = game_group.group_id GROUP BY `groups`.id) as gc'), function ($join) {
                $join->on('groups.id', '=', 'gc.drm_id');
            })
            ->where('games.type', '=', 'game')
            ->paginate(12);

        // Iterate through the results and construct the 'game' object.
        foreach ($result as $item) {
            $item->last_game = [
                'id' => $item->game_id,
                'name' => $item->game_name,
                'slug' => $item->game_slug,
            ];
            unset($item->game_id, $item->game_name, $item->game_slug);
        }

        return response()->api(
            data: $result,
            message: __("Groups")
        );

    }

    public function show($slug)
    {
        $group = Group::withCount('games')
            ->whereSlug($slug)
            ->firstOrFail();

        // Retrieve only the id and name columns for the associated games
        $games = $group->games()->with('status')->paginate(12);

        $group->games = GameApiResource::parse($games);
        $group = GroupApiResource::parse($group);

        return response()->api(
            data: $group,
            message: $group['name'].__(" Games")
        );
    }
}
