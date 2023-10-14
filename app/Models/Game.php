<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class);
    }

}
