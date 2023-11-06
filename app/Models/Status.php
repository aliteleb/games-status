<?php

namespace App\Models;

use App\Helpers\AdvancedDataTable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'color'];

    public static function datatable($options = []): AdvancedDataTable
    {
        $datatable = new AdvancedDataTable(Status::class, $options);
        $datatable->columns = ['name', 'color'];
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
            'color' => 'color',
        ];

        return $datatable;
    }

    // Validation
    public static function validate($protection = null): array
    {
        return validate_rules([
            'name' => 'required|string|min:3|max:255',
            'color' => 'nullable|string|min:3|max:255',
        ], $protection, request()->all());
    }
}
