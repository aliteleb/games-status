<?php

namespace App\Http\Controllers\API;

use App\Api\CommentApiResource;
use App\Api\GameApiResource;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Game;
use App\Models\Genre;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class GameController extends Controller
{
    public function index(Request $request)
    {
        $query = Game::with(['groups:name,slug', 'protections:name,slug'])
            ->select(['id', 'name', 'slug', 'release_date', 'crack_date', 'steam_appid'])
            ->where('need_crack', true)
            ->whereHas('genres');

        if ($request->input('crack_status')) {
            $query->where('game_status_id', $request->input('crack_status'));
        }

        $today = now()->format('Y-m-d');

        if ($request->input('release_status') == 1) {
            $query->where('release_date', '<', $today);
        } elseif ($request->input('release_status') == 2) {
            $query->where('release_date', '>=', $today);
        }

        if ($request->input('genres')) {
            $genres = $request->input('genres');
            $query->whereHas('genres', function ($query) use ($genres) {
                $query->whereIn('genres.id', $genres);
            });

        }

        if ($request->input('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', '%' . $search . '%');
        }

        $games = $query->paginate(12);

        $games->map(function ($game) {
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

            $game->title = $game->name;
            $game->status_text = $statusText;
            $game->days_diff = $daysDifference;
            $game->image = 'https://cdn.cloudflare.steamstatic.com/steam/apps/'.$game->steam_appid.'/header.jpg';
            $game->is_following = $is_following;

            unset($game->name);
        });

        $genres = Genre::select('id', 'name')->get()->pluck('name', 'id');
        $statuses = Status::select('id', 'name')->get()->pluck('name', 'id');
        return response()->api(
            data: [
                'games' => $games,
                'genres' => $genres,
                'statuses' => $statuses,
            ],
            message: __('Games')
        );
    }

    public function show(Request $request, $slug)
    {
        $game = Game::select(['id', 'name', 'slug', 'release_date', 'crack_date', 'steam_appid', 'header', 'cover', 'poster', 'game_status_id'])
            ->with(['protections:id,name,slug', 'groups:id,name,slug', 'status:id,name',])
            ->withCount('users as followers_count')
            ->where('slug', $slug)
            ->firstOrFail();

        $game->comments = CommentApiResource::parse(collect(Comment::latest_comments($game->id)));

        $user = auth()->user();
        $is_following = false;
        if ($user)
            $is_following = auth()->user()->following->contains($game->id);

        $game->is_following = $is_following;
        $game = GameApiResource::parse($game);

        return response()->api(
            data: $game,
            message: $game['name'] . __(" Page")
        );

    }

    public function follow(Request $request, $game_id)
    {
        $game = Game::select(['id', 'name'])
            ->withCount('users as followers_count')
            ->findOrFail($game_id);

        $game->users()->syncWithoutDetaching([auth()->user()->id]);

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

        $game = Game::select(['id', 'name'])
            ->withCount('users as followers_count')
            ->findOrFail($game_id);

        return response()->api(
            data: ['followers_count' => $game->users->count()],
            message: __("You're not following this game anymore."),
        );
    }

}
