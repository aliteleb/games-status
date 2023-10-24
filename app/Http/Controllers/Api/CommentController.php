<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Game;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $slug = $request->input('slug');
        $body = $request->input('body');

        $game = Game::select('id')->where('slug', $slug)->firstOrFail();

        $comment = Comment::create([
            'user_id' => auth()->user()->id,
            'game_id' => $game->id,
            'body' => $body,
        ]);

        return response()->api(
            data: $comment,
            message: 'Comment created successfully',
        );

    }
}
