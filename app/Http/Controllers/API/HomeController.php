<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;
use App\Models\Game;

class HomeController extends Controller
{
    public function index()
    {
        $hot_games = Game::select(['id', 'name', 'slug','release_date', 'crack_date', 'steam_appid'])
            ->where('is_hot', true)
            ->orderBy('ordering')
            ->limit(7)
            ->get();

        return response()->api(
            data: ['hot_games' => GameResource::collection($hot_games)],
            message: __("Home page")
        );
    }
}
