<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $fillable = ['name'];
    protected $hidden = ['pivot'];

    public function games()
    {
        return $this->belongsToMany(Game::class);
    }
}
