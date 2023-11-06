<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;
use App\Models\Game;
use App\Models\Note;

class HomeController extends Controller
{
    public function index()
    {
        $hot_games = Game::select(['id', 'name', 'slug','release_date', 'crack_date', 'steam_appid'])
            ->where('is_hot', true)
            ->orderBy('ordering')
            ->limit(7)
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
                'hot_games' => GameResource::collection($hot_games)
            ],
            message: __("Home page")
        );
    }
}
