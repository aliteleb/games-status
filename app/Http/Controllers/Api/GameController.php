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

}
