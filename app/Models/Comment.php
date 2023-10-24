<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'game_id', 'body'];

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
}
