<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'game_id', 'body'];
    protected $appends = ['time'];

    protected $with = ['user:username'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function game()
    {
        return $this->belongsTo(Game::class, 'game_id');
    }

    public function reactions()
    {
        return $this->belongsTo(Reaction::class, 'comment_id');
    }

    public function getTimeAttribute()
    {
        try {
            return $this->created_at->diffForHumans();
        } catch (\Exception $e) {
            return 'N/A';
        }
    }
}
