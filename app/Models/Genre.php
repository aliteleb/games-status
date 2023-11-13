<?php

namespace App\Models;

use App\Helpers\AdvancedDataTable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;

    protected $fillable = ['name'];
    public function games()
    {
        return $this->belongsToMany(Game::class);
    }

    public static function datatable($options = []): AdvancedDataTable
    {
        $datatable = new AdvancedDataTable(Genre::class, $options);
        $datatable->columns = ['name'];
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
        ];

        return $datatable;
    }

    // Validation
    public static function validate($protection = null): array
    {
        return validate_rules([
            'name' => 'required|string|min:3|max:255',
        ], $protection, request()->all());
    }
}
