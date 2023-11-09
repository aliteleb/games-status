<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use App\Models\Group;
use App\Models\Permission;
use App\Models\Game;
use App\Models\Protection;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class GameController extends Controller
{
    public function index()
    {
        // Datatable
        $datatable = Game::datatable();

        $query = $datatable->Selection(['is_hot' => 'desc']);
        $query->where('need_crack', true);
        $query->orderBy('id', 'desc');

        // Ajax datatable request
        if (request()->ajax()) {
            return datatables()->of($query)->make();
        }

        // Default datatable view
        return view('admin.layouts.datatable', ['datatable' => $datatable]);
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
            'username' => 'required|unique:users|string|min:3|max:16',
            'email' => 'required|string|email|unique:users|min:5|max:32',
            'password' => 'required|string|min:8|max:32|confirmed',
            'password_confirmation' => 'required|string|min:8|max:32|same:password',
            'gender' => 'required|in:male,female',
            'country_code' => 'required|string|min:2|max:2',
            'avatar' => 'required|image|mimes:jpeg,png,gif,webp,svg|max:1000'
        ]);

        if ($validator->fails()) {

        }

        return $request;
    }

    public function edit(Game $Game)
    {

    }

    public function update(Request $request, Game $Game)
    {

    }

    public function destroy(Request $request)
    {

    }
}
