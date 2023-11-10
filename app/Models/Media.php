<?php

namespace App\Models;

use App\Helpers\AdvancedDataTable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class Media extends Model
{
    use HasFactory;

    protected $table = 'media';
    protected $fillable = [
        'title',
        'file',
        'alt',
        'user_id',
        'path',
        'prefix',
        'description',
        'status',
        'mime',
        'type',
        'file_size',
        'height',
        'width',
    ];

    protected $appends = ['sizes', 'preview'];

    public static function datatable($options = []): AdvancedDataTable
    {
        $datatable = new AdvancedDataTable(Media::class, $options);
        $datatable->columns = ['file', 'alt', 'user.username', 'created_at', 'preview'];
        $datatable->buttons = ['selectAll', 'selectNone'];
        $datatable->extra_selection = ['path', 'prefix'];
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

    public static function upload($file, $path, $sizes = [], $keep_same_file_name = false, $title = '', $alt = '')
    {
        // Create the 'media' directory if it doesn't exist
        Storage::disk('public')->makeDirectory('media');
        Storage::disk('media')->makeDirectory($path);

        $file_save_name = round(microtime(true) * 1000) . '.webp';

        if ($keep_same_file_name) {
            // Determine the default values for alt and title
            $file_name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

            $file_save_name = $file_name . '.webp';

            // Check if the file already exists, if so, add a number to the name
            $counter = 1;

            while (Storage::disk('media')->exists($path . $file_save_name)) {
                $file_save_name = $file_name . '_' . $counter . '.webp';
                $counter++;
            }
        }

        // Get width and height of the uploaded image
        list($image_width, $image_height) = getimagesize($file->getPathname());

        // Get file size, mime type, and file type
        $fileSize = $file->getSize();
        $mime = $file->getClientMimeType();

        // Quality
        $quality = 100;
        $paths = [];
        foreach ($sizes as $prefix => $size) {
            $width = $size[0];
            $height = $size[1];

            $full_path = $path . '/' . $prefix . '/';
            $paths[] = $full_path;

            Storage::disk('media')->makeDirectory($full_path);

            $image = Image::make($file)->encode('webp', $quality);

            if ($width || $height) {
                $image = $image->resize($size[0], $size[1], function ($constraint) {
                    $constraint->aspectRatio();
                });
            }

            Storage::disk('media')->put($full_path . $file_save_name, $image->stream());
        }


        // Create a new Media record
        return Media::create([
            'title' => $title,
            'file' => $file_save_name,
            'alt' => $alt,
            'user_id' => auth()->check() ? auth()->user()->id : null,
            'path' => $path,
            'prefix' => implode(",", array_keys($sizes)),
            'width' => $image_width,
            'height' => $image_height,
            'file_size' => $fileSize,
            'mime' => $mime,
            'type' => 'webp',
        ]);

    }

    public static function uploadFile($file, $path, $size = [null, null], $keep_same_file_name = false, $resize_type = 'fit')
    {
        // Create the 'media' directory if it doesn't exist
        Storage::disk('public')->makeDirectory('media');
        Storage::disk('media')->makeDirectory($path);

        $file_save_name = round(microtime(true) * 1000) . '.webp';

        if ($keep_same_file_name) {
            // Determine the default values for alt and title
            $file_name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

            $file_save_name = $file_name . '.webp';

            // Check if the file already exists, if so, add a number to the name
            $counter = 1;

            while (Storage::disk('media')->exists($path . $file_save_name)) {
                $file_save_name = $file_name . '_' . $counter . '.webp';
                $counter++;
            }
        }

        // Quality
        $quality = 100;

        Storage::disk('media')->makeDirectory($path);

        $image = Image::make($file)->encode('webp', $quality);

        if ($size[0] || $size[1]) {

            if ($resize_type == 'fit') {
                $image = $image->fit($size[0], $size[1]);
            } else {
                $image = $image->resize($size[0], $size[1], function ($constraint) {
                    $constraint->aspectRatio();
                });
            }

        }

        Storage::disk('media')->put($path . $file_save_name, $image->stream());

        return $file_save_name;
    }

    public function getSizesAttribute()
    {
        $sizes = explode(',', $this->prefix);
        $result = [];
        foreach ($sizes as $index => $size) {
            $result[$size] = Storage::disk('media')->url($this->path . '/' . $size . '/' . $this->file);
        }
        return $result;
    }

    public function getPreviewAttribute()
    {
        if ($this->sizes && count($this->sizes) > 0) {
            return array_values($this->sizes)[0];
        }
        return "";
    }
}
