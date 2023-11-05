<?php

namespace App\Models;

use App\Helpers\AdvancedDataTable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    use HasFactory;

    protected $table = 'media';
    protected $fillable = [
        'title',
        'file',
        'alt',
        'user_id',
        'description',
        'status',
        'mime',
        'type',
        'file_size',
        'height',
        'width',
    ];

    public static function datatable($options = []) : AdvancedDataTable
    {
        $datatable = new AdvancedDataTable(Media::class, $options);
        $datatable->columns = ['file', 'alt', 'user.name', 'created_at'];
        $datatable->buttons = ['selectAll', 'selectNone'];
        $datatable->add = false;
        $datatable->custom_table = true;
        $datatable->modal_fields = [
            'title' => 'text',
            'alt' => 'text',
            'description' => 'textarea',
        ];
        $datatable->actions = [
            'edit_item' => [
                "icon" => "edit"
            ],
            'delete_item' => [
                "icon" => "trash"
            ],
        ];

        return $datatable;
    }

    // Validation
    public static function validate($media = null): array
    {
        return validate_rules([
            'file.*' => 'required|image|mimes:jpeg,png,gif,webp,svg|max:5,120',
            'title' => 'nullable|string:min:1|max:32',
            'alt' => 'nullable|string:min:1|max:32',
            'description' => 'nullable|string:min:1|max:255',
        ], $media, request()->all());
    }


    // Relations
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
