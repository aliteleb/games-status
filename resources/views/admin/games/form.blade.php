@extends('admin.layouts.app')

@push('head-end')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/css/bootstrap-grid.rtl.min.css"
          integrity="sha512-O0LJksijgJLiKH5dDSIH0z9NuZvuiA/ON1nTFDtjTQ6lS0W0N4JptZxpnKJR5cVwyU0Nc3i6t/InaUbOrM6JPg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- ... other scripts ... -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
@endpush

@section('content')
    <div class="container f-w">

        <form class="game-form" action="{{ isset($game) ? route('admin.games.update', $game) : route('admin.games.store') }}" method="{{ isset($game) ? 'PUT' : 'POST' }}">
            @csrf
            <div class="d-flex flex-wrap">
                <div class="col col-9 p-2">
                    <div class=" mb-3">
                        <input type="text" name="name" value="{{ old('name', isset($game) ? $game->name : '') }}" class="form-control form-control-lg"
                               placeholder="{{ __('ui.game_title') }}">
                        @error('title')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                    <div class="mb-3">
                        <div dir="ltr" class="input-group p-0">
                            <span class="input-group-addon">{{config('app.url')}}/</span>
                            <input type="text" name="slug" value="{{ old('slug', isset($game) ? $game->slug : '') }}" dir="ltr" class="form-control form-control-lg"
                                   placeholder="{{ __('ui.game_slug') }}">
                        </div>
                        @error('slug')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="row justify-content-between">

                        <div class="d-flex flex-column justify-center align-items-center mb-3 col col-10">
                            <label for="header">{{ __('ui.game_header') }}</label>
                            <img src="{{ asset('assets/images/game-placeholder.jpg') }}"
                                data-modal-selection="single" data-modal-field="id" width="800" height="150" class="settings-img" alt="">
                            <input type="hidden" name="header" value="{{ isset($game) ? $game->featured_image : '' }}">
                            @error('header')
                            <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="d-flex flex-column justify-center align-items-center mb-3 col col-2">
                            <label for="header">{{ __('ui.game_header') }}</label>
                            <img
                                src="{{ asset('assets/images/game-placeholder.jpg') }}"
                                data-modal-selection="single" data-modal-field="id" width="100" height="150" class="settings-img" alt="">
                            <input type="hidden" name="header" value="{{ isset($game) ? $game->featured_image : '' }}">
                            @error('header')
                            <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                    </div>

                    <div class="row justify-content-between">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="release_date">{{ __('ui.release_date') }}</label>
                                <input type="date" id="release_date" name="release_date" class="form-control" value="{{ old('release_date', isset($game) ? $game->release_date : '') }}">
                                @error('release_date')
                                <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="crack_date">{{ __('ui.crack_date') }}</label>
                                <input type="date" id="crack_date" name="crack_date" class="form-control" value="{{ old('crack_date', isset($game) ? $game->crack_date : '') }}">
                                @error('crack_date')
                                <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                    </div>

                    <div class="row justify-content-between">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="meta_score">{{ __('ui.meta_score') }}</label>
                                <input id="meta_score" type="number" name="meta_score" class="form-control" min="0" max="100" value="{{ old('meta_score', isset($game) ? $game->meta_score : '0') }}">
                                @error('meta_score')
                                <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="user_score">{{ __('ui.user_score') }}</label>
                                <input id="user_score" type="number" name="user_score" class="form-control" min="0" max="100" value="{{ old('user_score', isset($game) ? $game->user_score : '0') }}">
                                @error('user_score')
                                <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                    </div>




                </div>
                <div class="col col-3 text-center post-side pt-4">

                    <div class="mb-5">
                        <button type="submit" class="btn btn-success"> @lang('ui.save') </button>
                    </div>

                    <div class="d-flex flex-column justify-center align-items-center mb-3">
                        <label for="header">{{ __('ui.game_header') }}</label>
                        <img src="{{ asset('assets/images/game-placeholder.jpg') }}"
                             data-modal-selection="single" data-modal-field="id" width="260" height="140" class="settings-img" alt="">
                        <input type="hidden" name="header" value="{{ isset($game) ? $game->featured_image : '' }}">
                        @error('header')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-5">
                        <label for="genres">{{ __('ui.genres') }}</label>
                        <select id="genres" name="genres" class="form-control form-control-lg select2" multiple>
                            @foreach ($genres as $genreId => $genreName)
                                <option value="{{ $genreId }}"{{ (old('genres', isset($game) ? $game->genres : null) == $genreId) ? ' selected' : '' }}>
                                    {{ $genreName }}
                                </option>
                            @endforeach
                        </select>
                        @error('genres')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-5">
                        <label for="protections">{{ __('ui.protections') }}</label>
                        <select id="protections" name="protections" class="form-control form-control-lg select2" multiple>
                            @foreach ($protections as $protectionId => $protectionsName)
                                <option value="{{ $protectionId }}"{{ (old('protections', isset($game) ? $game->protections : null) == $protectionId) ? ' selected' : '' }}>
                                    {{ $protectionsName }}
                                </option>
                            @endforeach
                        </select>
                        @error('protections')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-5">
                        <label for="groups">{{ __('ui.groups') }}</label>
                        <select id="groups" name="groups" class="form-control form-control-lg select2" multiple>
                            @foreach ($groups as $groupId => $groupName)
                                <option value="{{ $groupId }}"{{ (old('groups', isset($game) ? $game->groups : null) == $groupId) ? ' selected' : '' }}>
                                    {{ $groupName }}
                                </option>
                            @endforeach
                        </select>
                        @error('groups')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-5">
                        <label for="status_name">{{ __('ui.status_name') }}</label>
                        <select id="status_name" name="game_status_id" class="form-control form-control-lg select2">
                            @foreach ($statuses as $statusId => $statusName)
                                <option value="{{ $statusId }}"{{ (old('status', isset($game) ? $game->status : null) == $statusId) ? ' selected' : '' }}>
                                    {{ $statusName }}
                                </option>
                            @endforeach
                        </select>
                        @error('groups')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>
                </div>
            </div>

        </form>

        <script>

          $("select.select2").select2({
            "language": {
              "noResults": function() {
                return "@lang('messages.no_results_found')";
                    }
                }
            });

        </script>


        <style>
            label.app-url b {
                font-family: math;
                color: #999;
                font-size: 1.5rem;
            }
            .game-form img{
                object-fit: cover;
            }
        </style>

    </div>
@stop
