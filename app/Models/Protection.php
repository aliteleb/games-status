<?php

namespace App\Models;

use App\Helpers\AdvancedDataTable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Protection extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug'];
    protected $hidden = ['pivot'];

    public function latest()
    {
        return $this->belongsToMany(Game::class, 'game_drm_protection', 'drm_protection_id', 'game_id');
    }

    public function games()
    {
        return $this->belongsToMany(Game::class, 'game_drm_protection', 'drm_protection_id', 'game_id');
    }

    public static function datatable($options = []): AdvancedDataTable
    {
        $datatable = new AdvancedDataTable(Protection::class, $options);
        $datatable->columns = ['name', 'slug'];
        $datatable->buttons = ['selectAll', 'selectNone'];
        $datatable->actions = [
            'edit_item' => [
                "icon" => "edit"
            ],
            'delete_item' => [
                "icon" => "trash"
            ],
        ];
        $datatable->modal_fields = [
            'name' => 'text',
            'slug' => 'text',
        ];

        return $datatable;
    }

    // Validation
    public static function validate($protection = null): array
    {
        return validate_rules([
            'name' => 'required|string|min:3|max:255',
            'slug' => 'required|alpha_dash|min:3|max:255|unique:protections,slug',
        ], $protection, request()->all());
    }
}
