<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DrmProtection;
use App\Models\Game;
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
            message: __("You're now following this game. You will receive notifications about its status."),
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
}
