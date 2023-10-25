<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'game_id', 'body', 'reply_to'];
    protected $appends = ['time', 'username', 'votes', 'voted'];
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

    public function getVotedAttribute(){

        $this->voted = null;
        $this->reactions->map(function ($reaction) {
            if ($reaction->user_id == auth()->user()->id)
                $this->voted = $reaction->type;
        });

    }
}
