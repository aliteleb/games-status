<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'game_id', 'body'];
    protected $appends = ['time'];
    protected $hidden = ['created_at', 'updated_at'];

    protected $with = ['user:username'];
    protected $withCount = ['reactions'];

    public function user()
    {
        return $this->belongsTo(User::class, 'id');
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
}
