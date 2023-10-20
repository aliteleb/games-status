<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DrmProtection;
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
        /*
        SELECT drm_protections.name, games.name
FROM drm_protections
JOIN (
    SELECT gdp.drm_protection_id, MAX(gdp.id) AS latest_game_id
    FROM game_drm_protection gdp
    GROUP BY gdp.drm_protection_id
) AS latest_games
ON drm_protections.id = latest_games.drm_protection_id
JOIN games ON latest_games.latest_game_id = games.id;
        */
        sleep(1);
        $protections = DrmProtection::select('id', 'name', 'slug')
            ->whereHas('games')
            ->withCount('games')
            ->paginate(12);

        foreach ($protections as $protection)
        {
            $protection->last_game = null;
            $game = DB::table('game_drm_protection')->where('drm_protection_id', $protection->id)->orderBy('id', 'desc')->first();
            if($game)
            {
                $id = $game->game_id;
                $game = Game::select('name', 'slug')->find($id);
                $protection->last_game = $game;

                if(!$game)
                {
                    $protection->asd = $id;
                    DB::table('game_drm_protection')->where('game_id', $id)->delete();
                }
            }
        }

        return response()->api(
            data: $protections,
            message: __("Protections")
        );

    }

    public function groups(Request $request)
    {
        sleep(1);
        $protections = Group::select('id', 'name', 'slug')
            ->whereHas('games')
            ->withCount('games')
            ->paginate(12);

        foreach ($protections as $protection)
        {
            $protection->last_game = null;
            $game = DB::table('game_group')->where('group_id', $protection->id)->orderBy('id', 'desc')->first();
            if($game)
            {
                $id = $game->game_id;
                $game = Game::select('name', 'slug')->find($id);
                $protection->last_game = $game;

                if(!$game)
                {
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
