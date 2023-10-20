<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GameController extends Controller
{
    public function follow(Request $request, $game_id)
    {
        $game = Game::select(['id', 'name'])
            ->withCount('users as followers_count')
            ->findOrFail($game_id);

        $game->users()->sync([auth()->user()->id]);

        return response()->api(
            data: ['followers_count' => $game->users->count()],
            message: __("You're now following '$game->name'"),
        );
    }

    public function unfollow(Request $request, $game_id)
    {
        $user = auth()->user();

        DB::table('game_user')
            ->where('game_id', $game_id)
            ->where('user_id', $user->id)
            ->delete();

        return response()->api(
            message: __("You're not following this game anymore."),
        );
    }

    public function protections(Request $request)
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

    public function groups(Request $request)
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

    public function group1s(Request $request)
    {
        $protections = Group::select('id', 'name', 'slug')
            ->whereHas('games')
            ->withCount('games')
            ->paginate(12);

        foreach ($protections as $protection) {
            $protection->last_game = null;
            $game = DB::table('game_group')->where('group_id', $protection->id)->orderBy('id', 'desc')->first();
            if ($game) {
                $id = $game->game_id;
                $game = Game::select('name', 'slug')->find($id);
                $protection->last_game = $game;

                if (!$game) {
                    $protection->asd = $id;
                    DB::table('game_group')->where('game_id', $id)->delete();
                }
            }
        }

        return response()->api(
            data: $protections,
            message: __("Groups")
        );

    }
}
