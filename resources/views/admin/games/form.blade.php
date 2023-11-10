@extends('admin.layouts.app')

@push('head-end')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/css/bootstrap-grid.rtl.min.css"
          integrity="sha512-O0LJksijgJLiKH5dDSIH0z9NuZvuiA/ON1nTFDtjTQ6lS0W0N4JptZxpnKJR5cVwyU0Nc3i6t/InaUbOrM6JPg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- ... other scripts ... -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
@endpush

@section('content')
    <div class="container f-w">

        <form class="game-form" action="{{ isset($game) ? route('admin.games.update', $game) : route('admin.games.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            @if(isset($game))
                <input name="_method" type="hidden" value="PUT">
            @endif
            <div class="d-flex flex-wrap">
                <div class="col col-9 p-2">
                    <div class=" mb-3">
                        <input type="text" name="name" value="{{ old('name', isset($game) ? $game->name : '') }}" class="form-control form-control-lg"
                               placeholder="{{ __('ui.game_title') }}">
                        @error('name')
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

                        <div id="cover-container" class="d-flex flex-column justify-center align-items-center mb-3 col col-10">
                            <label for="cover">{{ __('ui.game_cover') }}
                                <img id="preview-image"
                                     src="{{ isset($game) ? storage('media', 'images/games/covers/'.$game->cover) : asset('assets/images/game-placeholder.jpg') }}"
                                     data-modal-selection="single" data-modal-field="id" width="800" height="150" class="settings-img" alt="">
                            </label>
                            <input type="file" class="d-none" id="cover" name="cover">
                            @error('cover')
                            <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div id="poster-container" class="d-flex flex-column justify-center align-items-center mb-3 col col-2">
                            <label for="poster">{{ __('ui.game_poster') }}
                                <img
                                    id="poster-preview"
                                    src="{{ isset($game) ? storage('media', 'images/games/posters/'.$game->poster) : asset('assets/images/game-placeholder.jpg') }}"
                                    data-modal-selection="single" data-modal-field="id" width="100" height="150" class="settings-img" alt="">
                            </label>

                            <input type="file" class="d-none" id="poster" name="poster">
                            @error('poster')
                            <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                    </div>

                    <div class="row justify-content-between">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="release_date">{{ __('ui.release_date') }}</label>
                                <input type="date" id="release_date" name="release_date" class="form-control"
                                       value="{{ old('release_date', isset($game) ? $game->release_date : '') }}">
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
                                <input id="meta_score" type="number" name="meta_score" class="form-control" min="0" max="100"
                                       value="{{ old('meta_score', isset($game) ? $game->meta_score : '0') }}">
                                @error('meta_score')
                                <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="user_score">{{ __('ui.user_score') }}</label>
                                <input id="user_score" type="number" name="user_score" class="form-control" min="0" max="100"
                                       value="{{ old('user_score', isset($game) ? $game->user_score : '0') }}">
                                @error('user_score')
                                <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                    </div>

                    <div class="row justify-content-between">
                        <div class="col-md-4">
                            <div class="form-group trigger">
                                <label class="form-check-label" for="status">{{ __('ui.status') }}</label>
                                <input type="checkbox" class="form-check-input" id="status" name="status" {{ old('status', isset($game) && $game->status ? 'checked' : '') }}>
                                <label for="status" class="col-form-label trigger-label"></label>
                                @error('status')
                                <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group trigger">
                                <label class="form-check-label" for="is_hot">{{ __('ui.is_hot') }}</label>
                                <input type="checkbox" class="form-check-input" id="is_hot" name="is_hot" {{ old('is_hot', isset($game) && $game->is_hot ? 'checked' : '') }}>
                                <label for="is_hot" class="col-form-label trigger-label"></label>
                                @error('is_hot')
                                <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="ordering">{{ __('ui.ordering') }}</label>
                                <input id="ordering" type="number" name="ordering" class="form-control" value="{{ old('ordering', isset($game) ? $game->ordering : '0') }}">
                                @error('ordering')
                                <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                        </div>
                    </div>


                </div>

                <div class="col col-3 text-center post-side pt-4">

                    <div class="mb-5">
                        <button id="button-style" type="submit" class="btn btn-outline-success"> @lang('ui.save') </button>
                    </div>

                    <div id="header-container" class="d-flex flex-column justify-center align-items-center mb-3">
                        <label class="d-flex flex-column" for="header">{{ __('ui.game_header') }}
                            <img
                                id="header-preview"
                                src="{{ isset($game) ? storage('media', 'images/games/headers/'.$game->header) : asset('assets/images/game-placeholder.jpg') }}"
                                data-modal-selection="single" data-modal-field="id" width="260" height="140" class="settings-img" alt="">
                        </label>
                        <input type="file" class="d-none" id="header" name="header">
                        @error('header')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-5">
                        <label for="genres">{{ __('ui.genres') }}</label>
                        <select id="genres" name="genres[]" class="form-control form-control-lg select2" multiple>
                            @foreach ($genres as $genreId => $genreName)
                                <option value="{{ $genreId }}"{{ (in_array($genreId, old('genres', $selectedGenres ?? []))) ? ' selected' : '' }}>
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
                        <select id="protections" name="protections[]" class="form-control form-control-lg select2" multiple>
                            @foreach ($protections as $protectionId => $protectionName)
                                <option value="{{ $protectionId }}"{{ (in_array($protectionId, old('protections', $selectedProtections ?? []))) ? ' selected' : '' }}>
                                    {{ $protectionName }}
                                </option>
                            @endforeach
                        </select>
                        @error('protections')
                        <div class="invalid-feedback">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="mb-5">
                        <label for="groups">{{ __('ui.groups') }}</label>
                        <select id="groups" name="groups[]" class="form-control form-control-lg select2" multiple>
                            @foreach ($groups as $groupId => $groupName)
                                <option value="{{ $groupId }}"{{ (in_array($groupId, old('groups', $selectedGroups ?? []))) ? ' selected' : '' }}>
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
                                <option value="{{ $statusId }}"{{ (old('status', isset($game) ? $game->game_status_id : null) == $statusId) ? ' selected' : '' }}>
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


            // Define imgInp to represent the file input element
            const imgInp = document.getElementById("cover"); // Change 'cover' to the ID of your file input

            // Define blah to represent the image element where you want to display the preview
            const blah = document.getElementById("preview-image"); // Change 'preview-image' to the ID of your image element

            imgInp.onchange = evt => {
                const [file] = imgInp.files;
                if (file) {
                    // Update the src attribute of the 'blah' image element to show the preview
                    blah.src = URL.createObjectURL(file);
                }
            };

            // Initialize the image preview for the poster image
            const posterImgInp = document.getElementById("poster");
            const posterBlah = document.getElementById("poster-preview");

            posterImgInp.onchange = evt => {
                const [file] = posterImgInp.files;
                if (file) {
                    posterBlah.src = URL.createObjectURL(file);
                }
            };

            // Initialize the image preview for the header image
            const headerImgInp = document.getElementById("header");
            const headerBlah = document.getElementById("header-preview");

            headerImgInp.onchange = evt => {
                const [file] = headerImgInp.files;
                if (file) {
                    headerBlah.src = URL.createObjectURL(file);
                }
            };

        </script>


        <style>
            label.app-url b {
                font-family: math;
                color: #999;
                font-size: 1.5rem;
            }

            .game-form img {
                object-fit: cover;
            }
        </style>

    </div>
@stop
