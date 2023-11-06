<?php

namespace App\Models;

use App\Helpers\AdvancedDataTable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $hidden = ['pivot'];

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

    // Api stuff
    public static function Api($game)
    {

    }

    public static function datatable(): AdvancedDataTable
    {
        $datatable = new AdvancedDataTable(Game::class);
        $datatable->columns = ['name'];
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
