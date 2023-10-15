<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DrmProtection extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function games()
    {
        return $this->belongsToMany(DrmProtection::class, 'game_drm_protection', 'drm_protection_id', 'game_id');
    }
}
