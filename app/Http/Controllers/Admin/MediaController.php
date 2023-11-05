<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Media;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class MediaController extends Controller
{
    public function index()
    {
        // Ajax datatable request
        if (request()->ajax())
            return datatables()->of(datatable_selection(Media::class))->make();

        // Default datatable view
        return view('admin.media.index', ['model' => Media::class]);
    }

    public function store(Request $request)
    {
        // Validate
        Media::validate();

        // Create the 'media' directory if it doesn't exist
        Storage::disk('public')->makeDirectory('media');
        Storage::disk('media')->makeDirectory('/images/original');
        Storage::disk('media')->makeDirectory('/images/full');
        Storage::disk('media')->makeDirectory('/images/large');
        Storage::disk('media')->makeDirectory('/images/medium');
        Storage::disk('media')->makeDirectory('/images/small');
        Storage::disk('media')->makeDirectory('/images/thumbnail');
        Storage::disk('media')->makeDirectory('/images/lazy');

        // Retrieve the uploaded files
        $file = $request->file('file');

        // Determine the default values for alt and title
        $file_extension = $file->getClientOriginalExtension();
        $file_name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

        $file_save_name = $file_name . '.webp';
        $alt = $request->input('alt') ?? $file_name;
        $title = $request->input('title') ?? $file_name;

        // Check if the file already exists, if so, add a number to the name
        $counter = 1;
        while (Storage::disk('media')->exists('/images/medium/' . $file_save_name)) {
            $file_save_name = $file_name . '_' . $counter . '.webp';
            $counter++;
        }

        // Store the original file
        // $file->storeAs('/images/original/', $file_save_name, 'media');

        // Get width and height of the uploaded image
        list($width, $height) = getimagesize($file->getPathname());

        // Get file size, mime type, and file type
        $fileSize = $file->getSize();
        $mime = $file->getClientMimeType();
        $fileType = $file->getExtension();

        // Full-size image
        // Image::make($file)->encode('webp', 80)->save(public_path('media/images/full/' . $file_save_name));

        // New Quality
        $quality = 80;

        // Large image
        Image::make($file)->encode('webp', $quality)->resize(1080, null, function ($constraint) {
            $constraint->aspectRatio();
        })->save(public_path('media/images/large/' . $file_save_name));

        // Medium image
        Image::make($file)->encode('webp', $quality)->resize(720, null, function ($constraint) {
            $constraint->aspectRatio();
        })->save(public_path('media/images/medium/' . $file_save_name));

        // Small image
        Image::make($file)->encode('webp', $quality)->resize(360, null, function ($constraint) {
            $constraint->aspectRatio();
        })->save(public_path('media/images/small/' . $file_save_name));

        // Thumbnail image
        Image::make($file)->encode('webp', $quality)->resize(144, null, function ($constraint) {
            $constraint->aspectRatio();
        })->save(public_path('media/images/thumbnail/' . $file_save_name));

        // Thumbnail image
        Image::make($file)->encode('webp', 80)->resize(20, null, function ($constraint) {
            $constraint->aspectRatio();
        })->save(public_path('media/images/lazy/' . $file_save_name));

        // Create a new Media record
        Media::create([
            'title' => $title,
            'file' => $file_save_name,
            'alt' => $alt,
            'user_id' => auth()->user()->id,
            'width' => $width,
            'height' => $height,
            'file_size' => $fileSize,
            'mime' => $mime,
            'type' => 'webp',
        ]);

        // Response
        return response()->json(['status' => 'success', 'message' => __('datatable.added_successfully')]);
    }

    public function show(Media $media): Collection
    {
        return without_accessors($media);
    }
    public function update(Media $media): JsonResponse
    {
        // Validate
        $validatedData = Media::validate($media);

        // Update
        $media->update($validatedData);

        // Response
        return response()->json(['status' => 'success', 'message' => __('datatable.edit_successfully')]);
    }
    public function destroy(Request $request): JsonResponse
    {
        // Get the media IDs to be deleted
        $idsToDelete = $request->input('ids', []);

        // Get the paths of the files associated with the media
        $filePaths = Media::whereIn('id', $idsToDelete)->pluck('file')->map(function ($filename) {
            return [
                'original' => public_path('media/images/original/' . $filename),
                'large' => public_path('media/images/large/' . $filename),
                'medium' => public_path('media/images/medium/' . $filename),
                'thumbnail' => public_path('media/images/thumbnail/' . $filename),
            ];
        })->flatten();

        // Delete the files from storage
        foreach ($filePaths as $filePath) {
            if (file_exists($filePath))
                unlink($filePath);
        }

        // Delete the media records from the database
        Media::whereIn('id', $idsToDelete)->delete();

        // Response
        return response()->json(['status' => 'success', 'message' => __('datatable.deleted_successfully')]);
    }

}
