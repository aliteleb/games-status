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

        // Retrieve the uploaded files
        $file = $request->file('file');

        $media = Media::upload($file, '/images', [
            "/global/" => [null, null],
        ], false);

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
