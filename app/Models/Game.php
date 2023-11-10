<?php

namespace App\Models;

use App\Helpers\AdvancedDataTable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'header', 'poster', 'cover', 'release_date', 'crack_date', 'meta_score', 'user_score', 'game_status_id', 'status', 'need_crack', 'is_hot'];
    protected $hidden = ['pivot'];
    protected $casts = ['is_hot' => 'boolean'];

    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class);
    }

    public function protections()
    {
        return $this->belongsToMany(Protection::class, 'game_drm_protection', 'game_id', 'drm_protection_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function status()
    {
        return $this->hasOne(Status::class, 'id','game_status_id');
    }

    public static function datatable(): AdvancedDataTable
    {
        $datatable = new AdvancedDataTable(Game::class);
        $datatable->columns = ['name', 'status.name', 'release_date', 'crack_date', 'is_hot'];
        $datatable->extra_selection = ['game_status_id'];
        $datatable->actions = [
            'edit_item' => [
                "method" => "view",
                "icon" => "edit"
            ],
            'delete_item' => [
                "icon" => "trash"
            ],
        ];
        $datatable->add_method = "view";
        return $datatable;
    }
}
