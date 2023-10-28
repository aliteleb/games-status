<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show($username)
    {
        $user = User::select(['id', 'username'])
            ->with('games', function ($query){
                return $query->paginate();
            })
            ->withCount('games')
            ->where('username', $username)
            ->firstOrFail();

        $games = $user->games;
        unset($user->games);
        $user->games = GameResource::collection($games);
        unset($user->following);

        $total_pages = ceil($user->games_count / 12);
        $next_page = 2;
        $next_page_url = null;
        if(request()->query('page'))
            $next_page = request()->query('page') + 1;

        if($next_page > $total_pages)
            $next_page = null;

        if($next_page)
            $next_page_url = route('api.user', $username).'?page='.$next_page;

        $user->last_page = $total_pages;
        $user->next_page_url = $next_page_url;

        return response()->api(
            data: $user,
            message: $user->username.__(" Profile")
        );

    }
}
