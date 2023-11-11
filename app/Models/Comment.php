<?php

namespace App\Models;

use App\Helpers\AdvancedDataTable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'game_id', 'body', 'reply_to', 'mention'];
    protected $appends = ['time', 'username', 'display_name', 'user_image', 'votes', 'voted'];

    protected $with = ['user:id,username,display_name,media_id', 'reactions', 'replies'];
    protected $withCount = ['reactions'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function reactions()
    {
        return $this->hasMany(Reaction::class);
    }
    public function replies()
    {
        return $this->hasMany(Comment::class, 'reply_to');
    }
    public function parentComment()
    {
        return $this->belongsTo(Comment::class, 'reply_to');
    }

    public function getTimeAttribute()
    {
        try {
            if($this->created_at)
                return $this->created_at->diffForHumans();
            else
                return 'N/A';
        } catch (\Exception $e) {
            return 'N/A';
        }
    }

    public function getUsernameAttribute()
    {
        if($this->user)
            return $this->user->username;
        else
            return 'N/A';

    }
    public function getDisplayNameAttribute()
    {
        if($this->user && $this->user->display_name)
            return $this->user->display_name;

        if($this->user && $this->user->username)
            return '@'.$this->user->username;

        return null;
    }

    public function getVotesAttribute(){

        if($this->reactions)
            return count($this->reactions->where('type', 'up')) - count($this->reactions->where('type', 'down'));
        else
            return 0;

    }

    public function getVotedAttribute()
    {
        $vote = null;
        $user = auth()->user();
        $user_id = null;
        if($user)
            $user_id = $user->id;

        foreach ($this->reactions as $reaction) {
            if ($reaction->user_id == $user_id) {
                $vote = $reaction->type;
                break;
            }
        }
        return $vote;
    }

    public function getUserImageAttribute()
    {
        try {
            $image = $this->user->avatar->sizes['small'];

        }catch (\Exception $e) { }
        return null;
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
                $comment->username = $comment->user->display_name ?: $comment->user->username;
            else
                $comment->username = 'N/A';

            unset($comment->reactions);
            unset($comment->user);
        });

        return $comments;
    }

    public static function refactComments($comments){

        foreach ($comments as $comment)
        {
            $replies = $comment->replies;
            unset($comment->replies);
            $comment->replies = self::refactReplies($replies, $comment->username);
            $comment->replies = collect($comment->replies)->sortBy('id');
            $comment->replies = array_values($comment->replies->toArray());
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

            //$reply->mention = $rely_to;
            unset($reply->replies);
        }
        return $replies;
    }

    public static function datatable($options = []): AdvancedDataTable
    {
        $datatable = new AdvancedDataTable(Comment::class, $options);
        $datatable->columns = ['user.username', 'body', 'game.name'];
        $datatable->buttons = ['selectAll', 'selectNone'];
        $datatable->actions = [
            'edit_item' => [
                "icon" => "edit"
            ],
            'delete_item' => [
                "icon" => "trash"
            ],
        ];
        $datatable->modal_fields = [
            'body' => 'textarea',
        ];

        return $datatable;
    }

    // Validation
    public static function validate($protection = null): array
    {
        return validate_rules([
            'name' => 'required|string|min:3|max:255',
            'color' => 'nullable|string|min:3|max:255',
        ], $protection, request()->all());
    }

}
