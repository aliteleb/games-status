<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'game_id', 'body', 'reply_to'];
    protected $appends = ['time', 'username', 'user_image', 'votes', 'voted'];
    protected $hidden = ['created_at', 'updated_at'];

    protected $with = ['user:id,username', 'reactions', 'replies'];
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
        return asset('assets/images/users/50/'.$this->user_id.'.webp');

    }

}
