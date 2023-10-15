<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Game;

class HomeController extends Controller
{
    public function index(){
        $hot_games = Game::with(['protections', 'groups'])->where('is_hot', true)->orderBy('ordering')->limit(7)->get();
        return response()->api(
            data: ['hot_games' => $hot_games],
            message: __("Home page")
        );
    }
}
