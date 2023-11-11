<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Game;
use App\Models\Notification;
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
        $parent_username = null;
        if ($reply_to) {
            $parent = Comment::find($reply_to);
            $game_id = $parent->game_id;
            $parent_username = $parent->username;

            $reply_to = $parent->id;
            if($parent->reply_to)
                $reply_to = $parent->reply_to;

        }

        if (!$parent) {
            $game = Game::select('id')->where('slug', $slug)->firstOrFail();
            $game_id = $game->id;
        }

        $comment = Comment::create([
            'user_id' => auth()->user()->id,
            'game_id' => $game_id,
            'body' => $body,
            'reply_to' => $reply_to,
            'mention' => $parent_username
        ]);

        $user = auth()->user();
        if($parent && $parent->user_id !== $user->id)
        {
            $notification = Notification::create([
                'type' => 'reply',
                'user_id' => $parent->user_id,
                'comment_id' => $comment->id,
                'game_id' => $game_id,
            ]);
        }

        return response()->api(
            data: Comment::latest_comments($game_id),
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

        $comment = Comment::findOrFail($comment_id);

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
            Notification::create([
                'type' => $vote_type."-vote",
                'user_id' => $comment->user_id,
                'comment_id' => $comment->id,
                'game_id' => $comment->game_id,
            ]);
        }

        $comments = Comment::latest_comments($comment->game_id);

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
            data: Comment::latest_comments($game_id),
            message: 'Comment deleted',
        );
    }

    private function deleteReplies($comment)
    {
        $replies = $comment->replies;

        $ids = [];
        foreach ($replies as $reply) {

            $ids[] = $reply->id;

            // Recursively delete nested replies
            if($comment->reply_to == null)
                $ids = array_merge($ids, $this->deleteReplies($reply));

            // Delete the reply
            // $reply->delete();
        }

        return $ids;
    }

}
