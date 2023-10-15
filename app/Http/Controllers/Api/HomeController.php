<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;
use App\Models\Game;

class HomeController extends Controller
{
    public function index()
    {
        sleep(env('API_VIRTUAL_DELAY', 1));

        $hot_games = Game::with(['protections', 'groups'])->where('is_hot', true)->orderBy('ordering')->limit(7)->get();
        return response()->api(
            data: ['hot_games' => GameResource::collection($hot_games)],
            message: __("Home page")
        );
    }
}
