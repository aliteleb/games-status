<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $slug = $request->input('slug');
        $body = $request->input('body');

        // Define the validation rules
        $rules = [
            'body' => 'required|string|max:500',
        ];

        // Create a validator
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->api(
                status: "error",
                data: $validator->errors(),
                message: __("Whoops! Something went wrong."),
                status_code: 422
            );
        }

        $game = Game::select('id')->where('slug', $slug)->firstOrFail();

        $comment = Comment::create([
            'user_id' => auth()->user()->id,
            'game_id' => $game->id,
            'body' => $body,
        ]);

        $user = auth()->user();

        $comments = Comment::where('game_id', $game->id)
            ->with(['user','replies', 'reactions'])
            ->latest()->get();
        $comments->map(function ($comment) use ($user) {
            $comment->voted = null;
            $comment->reactions->map(function ($reaction) use ($comment, $user){
                if($reaction->user_id == $user->id)
                    $comment->voted = $reaction->type;
            });
            $comment->votes = count($comment->reactions);


            if($comment->user)
                $comment->username = $comment->user->username;
            else
                $comment->username = 'N/A';

            unset($comment->reactions);
            unset($comment->user);

        });

        return response()->api(
            data: $comments,
            message: 'Comment created successfully',
        );

    }
}
