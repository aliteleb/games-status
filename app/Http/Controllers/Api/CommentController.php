<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Game;
use App\Models\Reaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $slug = $request->input('slug');
        $body = $request->input('body');
        $reply_to = $request->input('reply_to');

        // Define the validation rules
        $rules = [
            'body' => 'required|string|max:500',
        ];

        // Define custom error messages
        $customMessages = [
            'body.required' => 'Please provide a comment.',
            'body.string' => 'The comment should be a text.',
            'body.max' => 'The comment should not exceed 500 characters.',
        ];

        // Create a validator with custom messages
        $validator = Validator::make($request->all(), $rules, $customMessages);

        if ($validator->fails()) {
            return response()->api(
                status: "error",
                data: $validator->errors(),
                message: __("Whoops! Something went wrong."),
                status_code: 422
            );
        }

        $parent = null;
        $game_id = null;
        $parent_id = null;

        if ($reply_to) {
            $parent = Comment::find($reply_to);
            $game_id = $parent->game_id;
            $parent_id = $parent->id;
        }

        if (!$parent) {
            $game = Game::select('id')->where('slug', $slug)->firstOrFail();
            $game_id = $game->id;
        }

        Comment::create([
            'user_id' => auth()->user()->id,
            'game_id' => $game_id,
            'body' => $body,
            'reply_to' => $parent_id,
        ]);

        return response()->api(
            data: self::latest_comments($game_id),
            message: 'Comment posted successfully',
        );

    }

    public function vote(Request $request)
    {
        $comment_id = $request->input('id');
        $vote_type = $request->input('vote');

        if ($vote_type !== 'up' && $vote_type !== 'down') {
            return response()->api(
                status: "error",
                message: __("Whoops! Something went wrong."),
                status_code: 400,
            );
        }

        $comment = Comment::find($comment_id);

        $user = auth()->user();
        $reaction = Reaction::where('comment_id', $comment->id)
            ->where('user_id', $user->id)
            ->first();

        if ($reaction) {
            if ($reaction->type == $vote_type)
                $reaction->delete();
            else {
                $reaction->type = $vote_type;
                $reaction->save();
            }
        } else {
            Reaction::create([
                'user_id' => auth()->user()->id,
                'comment_id' => $comment->id,
                'type' => $vote_type,
            ]);
        }

        $comments = self::latest_comments($comment->game_id);

        return response()->api(
            data: $comments,
            status: "success",
            message: __("Voted successfully")
        );
    }

    public function delete($id)
    {
        $comment = Comment::where(['id' => $id, 'user_id' => auth()->user()->id])->firstOrFail();
        $game_id = $comment->game_id;

        // Recursively delete replies
        Comment::whereIn('id', $this->deleteReplies($comment))->delete();

        // Delete the comment
        $comment->delete();

        return response()->api(
            data: self::latest_comments($game_id),
            message: 'Comment deleted',
        );
    }

    public static function latest_comments($game_id)
    {
        $user = auth()->user();

        $comments = Comment::where('game_id', $game_id)
            ->whereNull('reply_to')
            ->with(['user', 'replies', 'reactions'])
            ->latest()->get();

        $comments = Comment::refactComments($comments);

        $comments->map(function ($comment) use ($user) {
            $comment->voted = null;
            $comment->reactions->map(function ($reaction) use ($comment, $user) {
                if ($reaction->user_id == $user->id)
                    $comment->voted = $reaction->type;
            });

            if ($comment->user)
                $comment->username = $comment->user->username;
            else
                $comment->username = 'N/A';

            unset($comment->reactions);
            unset($comment->user);
        });

        return $comments;
    }

    private function deleteReplies($comment)
    {
        $replies = $comment->replies;

        $ids = [];
        foreach ($replies as $reply) {

            $ids[] = $reply->id;

            // Recursively delete nested replies
            $ids = array_merge($ids, $this->deleteReplies($reply));

            // Delete the reply
            // $reply->delete();
        }

        return $ids;
    }

    public static function refactComments($comments){

        foreach ($comments as $comment)
        {
            $replies = $comment->replies;
            unset($comment->replies);
            $comment->replies = self::refactReplies($replies, $comment->username);
        }

        return $comments;

    }
    public static function refactReplies($comments, $rely_to = null){

        $replies = [];
        foreach ($comments as $reply)
        {
            $replies[] = $reply;
            if($reply->replies)
                $replies = array_merge($replies, self::refactReplies($reply->replies, $reply->username));

            $reply->mention = $rely_to;
            unset($reply->replies);
        }
        return $replies;
    }
}
