<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;
use App\Models\Game;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class GameController extends Controller
{
    public function show(Request $request, $slug)
    {
        $game = Game::select(['id', 'name', 'slug','release_date', 'crack_date', 'steam_appid'])
            ->with(['protections:id,name,slug', 'groups:id,name,slug'])
            ->withCount('users as followers_count')
            ->where('slug', $slug)
            ->firstOrFail();

        $release_date = Carbon::parse($game->release_date);
        $crack_date = Carbon::parse($game->crack_date);
        $daysDifference = $crack_date->diffInDays($release_date);

        if($game->crack_date == null){
            $statusText = 'UNCRACKED';
            $daysDifference = now()->diffInDays($release_date);
        }
        else
            $statusText = 'CRACKED';

        if ($release_date->isFuture())
            $statusText = 'UNRELEASED';

        $user = auth()->user();
        $is_following = false;
        if($user)
            $is_following = auth()->user()->following->contains($game->id);

        $game->status_text = $statusText;
        $game->days_diff = $daysDifference;
        $game->header = 'https://cdn.cloudflare.steamstatic.com/steam/apps/'.$game->steam_appid.'/header.jpg';
        $game->poster = 'https://cdn.cloudflare.steamstatic.com/steam/apps/'.$game->steam_appid.'/library_600x900.jpg';
        $game->cover = 'https://cdn.cloudflare.steamstatic.com/steam/apps/'.$game->steam_appid.'/library_hero.jpg';
        $game->is_following = $is_following;
        $game->release_date = $release_date->format('M d, Y');
        $game->crack_date = $crack_date->format('M d, Y');

        return response()->api(
            data: $game,
            message: $game->name.__(" Page")
        );

    }

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
