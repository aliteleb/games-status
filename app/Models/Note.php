<?php

namespace App\Models;

use App\Helpers\AdvancedDataTable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'body', 'show_in_home', 'ordering', 'status'];
    public static function datatable($options = []): AdvancedDataTable
    {
        $datatable = new AdvancedDataTable(Note::class, $options);
        $datatable->columns = ['type', 'body'];
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
            'type' => 'select|info,success,warning,danger',
            'body' => 'textarea',
            'show_in_home' => 'boolean',
            'ordering' => 'number',
            'status' => 'boolean',
        ];

        return $datatable;
    }

    // Validation
    public static function validate($protection = null): array
    {
        return validate_rules([
            'type' => 'required|in:info,success,warning,danger',
            'body' => 'required|string|min:3|max:255',
            'show_in_home' => 'nullable|boolean|string',
            'ordering' => 'nullable|numeric',
            'status' => 'required|in:0,1',
        ], $protection, request()->all());
    }
}
