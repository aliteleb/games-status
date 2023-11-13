<?php

namespace App\Http\Controllers\API;

use App\Api\GameApiResource;
use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;
use App\Models\Game;
use App\Models\Note;

class HomeController extends Controller
{
    public function index()
    {
        $hot_games = Game::with('status:id,name')->select(['id', 'name', 'slug','release_date', 'crack_date', 'steam_appid', 'header', 'game_status_id'])
            ->where('is_hot', true)
            ->orderBy('ordering')
            ->limit(7)
            ->get();

        $latest_cracked_games = Game::with('status:id,name')->select(['id', 'name', 'slug','release_date', 'crack_date', 'steam_appid', 'header', 'game_status_id'])
            ->where('is_hot', false)
            ->where('game_status_id', 2)
            ->whereHas('status', function ($query) {
                $query->where('name', 'CRACKED');
            })
            ->orderBy('id', 'desc')
            ->limit(8)
            ->get();

        $hot_game_ids = $hot_games->pluck('id')->toArray();
        $latest_cracked_game_ids = $latest_cracked_games->pluck('id')->toArray();

        $latest_unreleased_games = Game::with('status:id,name')
            ->select(['id', 'name', 'slug','release_date', 'crack_date', 'steam_appid', 'header', 'game_status_id'])
            ->where('is_hot', false)
            ->where('release_date', '>=', now())
            ->whereNotIn('id', array_merge($hot_game_ids, $latest_cracked_game_ids))
            ->orderBy('release_date')
            ->limit(8)
            ->get();

        $notes = Note::select(['body'])
            ->latest()
            ->orderBy('ordering')
            ->where('show_in_home', true)
            ->where('status', true)
            ->get();

        return response()->api(
            data: [
                'notes' => $notes,
                'hot_games' => GameApiResource::parse($hot_games),
                'latest_cracked_games' => GameApiResource::parse($latest_cracked_games),
                'latest_unreleased_games' => GameApiResource::parse($latest_unreleased_games),
            ],
            message: __("Home page")
        );
    }
}
