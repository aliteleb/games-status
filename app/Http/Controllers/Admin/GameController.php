<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use App\Models\Group;
use App\Models\Media;
use App\Models\Permission;
use App\Models\Game;
use App\Models\Protection;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class GameController extends Controller
{
    public function index()
    {
        // Datatable
        $datatable = Game::datatable();

        $query = $datatable->Selection(['is_hot' => 'desc']);
        $query->where('need_crack', true);
        $query->orderBy('ordering', 'asc');
        $query->orderBy('id', 'desc');

        // Ajax datatable request
        if (request()->ajax()) {
            return datatables()->of($query)->make();
        }

        // Default datatable view
        return view('admin.layouts.datatable', ['datatable' => $datatable]);
    }

    public function show()
    {

    }
    public function create()
    {
        $genres = Genre::all()->pluck('name', 'id');
        $protections = Protection::all()->pluck('name', 'id');
        $groups = Group::all()->pluck('name', 'id');
        $statuses = Status::all()->pluck('name', 'id');
        return view('admin.games.form', compact('genres', 'protections', 'groups', 'statuses'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
            'slug' => 'required|alpha_dash|min:3|max:255|unique:games,slug',
            'header' => 'required|image|mimes:jpeg,png,webp|max:10000',
            'poster' => 'required|image|mimes:jpeg,png,webp|max:10000',
            'cover' => 'required|image|mimes:jpeg,png,webp|max:10000',
            'release_date' => 'nullable|date',
            'crack_date' => 'nullable|date',
            'meta_score' => 'nullable|numeric|min:0|max:100',
            'user_score' => 'nullable|numeric|min:0|max:100',
            'game_status_id' => 'nullable|exists:statuses,id',
        ]);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        $header = Media::uploadFile(file: $request->file('header'), path: "/images/games/headers/", size: [560, 315]);
        $poster = Media::uploadFile(file: $request->file('poster'), path: "/images/games/posters/", size: [300, 450]);
        $cover = Media::uploadFile(file: $request->file('cover'), path: "/images/games/covers/", size: [1920, 620]);

        // Add the file names to the validated data
        $validatedData = $validator->validated();
        $validatedData['header'] = $header;
        $validatedData['poster'] = $poster;
        $validatedData['cover'] = $cover;
        $validatedData['need_crack'] = true;

        if($request->has('is_hot'))
            $validatedData['is_hot'] = true;
        else
            $validatedData['is_hot'] = false;

        if($request->has('status'))
            $validatedData['status'] = true;
        else
            $validatedData['status'] = false;

        $game = Game::create($validatedData);

        // Attaches
        if ($request->has('genres'))
            $game->genres()->attach($request->input('genres'));

        if ($request->has('groups'))
            $game->groups()->attach($request->input('groups'));

        if ($request->has('protections'))
            $game->protections()->attach($request->input('protections'));

        return redirect()->route('admin.games.index')->with('success', 'Game added successfully.');
    }

    public function edit(Game $game)
    {
        $genres = Genre::all()->pluck('name', 'id');
        $protections = Protection::all()->pluck('name', 'id');
        $groups = Group::all()->pluck('name', 'id');
        $statuses = Status::all()->pluck('name', 'id');

        // Get the selected genres, protections, groups, and status for the current game
        $selectedGenres = $game->genres->pluck('id')->toArray();
        $selectedProtections = $game->protections->pluck('id')->toArray();
        $selectedGroups = $game->groups->pluck('id')->toArray();

        return view('admin.games.form', compact('game', 'genres', 'protections', 'groups', 'statuses', 'selectedGenres', 'selectedProtections', 'selectedGroups'));
    }


    public function update(Request $request, Game $game)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
            'slug' => 'required|alpha_dash|min:3|max:255|unique:games,slug,' . $game->id,
            'header' => 'nullable|image|mimes:jpeg,png,webp|max:10000',
            'poster' => 'nullable|image|mimes:jpeg,png,webp|max:10000',
            'cover' => 'nullable|image|mimes:jpeg,png,webp|max:10000',
            'release_date' => 'nullable|date',
            'crack_date' => 'nullable|date',
            'meta_score' => 'nullable|numeric|min:0|max:100',
            'user_score' => 'nullable|numeric|min:0|max:100',
            'game_status_id' => 'nullable|exists:statuses,id',
        ]);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Update only the fields that are present in the request
        $validatedData = $request->only([
            'name',
            'slug',
            'release_date',
            'crack_date',
            'meta_score',
            'user_score',
            'game_status_id',
            'ordering',
        ]);

        if($request->has('is_hot'))
            $validatedData['is_hot'] = true;
        else
            $validatedData['is_hot'] = false;

        if($request->has('status'))
            $validatedData['status'] = true;
        else
            $validatedData['status'] = false;

        $game->fill($validatedData);

        // Handle file uploads and update filenames
        if ($request->hasFile('header')) {

            if($game->header)
            {
                $file = public_path('media/images/games/headers/'.$game->header);
                if (file_exists($file))
                    unlink($file);
            }

            $header = Media::uploadFile(file: $request->file('header'), path: "/images/games/headers/", size: [560, 315]);
            $game->header = $header;
        }

        if ($game->poster && $request->hasFile('poster')) {
            if($game->poster)
            {
                $file = public_path('media/images/games/poster/'.$game->header);
                if (file_exists($file))
                    unlink($file);
            }

            $poster = Media::uploadFile(file: $request->file('poster'), path: "/images/games/posters/", size: [300, 450]);
            $game->poster = $poster;
        }

        if ($game->cover && $request->hasFile('cover')) {
            if($game->cover)
            {
                $file = public_path('media/images/games/cover/'.$game->header);
                if (file_exists($file))
                    unlink($file);
            }

            $cover = Media::uploadFile(file: $request->file('cover'), path: "/images/games/covers/", size: [1920, 620]);
            $game->cover = $cover;
        }

        $game->save();

        // Sync genres
        if ($request->has('genres')) {
            $game->genres()->sync($request->input('genres'));
        } else {
            // If no genres are provided, detach all existing genres
            $game->genres()->detach();
        }

        // Sync groups
        if ($request->has('groups')) {
            $game->groups()->sync($request->input('groups'));
        } else {
            // If no groups are provided, detach all existing groups
            $game->groups()->detach();
        }

        // Sync protections
        if ($request->has('protections')) {
            $game->protections()->sync($request->input('protections'));
        } else {
            // If no protections are provided, detach all existing protections
            $game->protections()->detach();
        }

        return redirect()->route('admin.games.index')->with('success', 'Game updated successfully.');
    }


    public function destroy(Request $request)
    {

    }
}
