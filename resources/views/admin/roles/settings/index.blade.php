@extends('admin.layouts.app')

@push('head-end')

    <script type="text/javascript" src="https://cdn.assets.salla.network/dash/cp/assets/js/plugins/forms/styling/switchery.min.js"></script>
    <script type="text/javascript" src="https://cdn.assets.salla.network/dash/cp/assets/js/plugins/forms/styling/switch.min.js"></script>
@endpush

@section('content')
    <style>
        textarea {
            height: 120px !important;
        }

        ul.nav-pills {
            display: flex;
            gap: 1px;
        }

        .mb-3r {
            margin-bottom: 4rem;
        }
    </style>

    <form action="{{ route('admin.settings.update') }}" method="POST" class="form">
        @csrf
        <div class="container">
            <div class="row">
                <div class="col-md-2">
                    <ul class="nav nav-pills flex-column">
                        @foreach($sections as $section)
                            <li class="nav-item @if($loop->first){{"active"}}@endif">
                                <a class="nav-link" id="{{ $section }}-tab" data-toggle="pill" href="#{{ $section }}">{{ __('settings.sections.'.$section) }}</a>
                            </li>
                        @endforeach
                    </ul>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-9">
                    <div class="tab-content">
                        @foreach($sections as $section)
                            <div class="tab-pane fade @if($loop->first){{"active in"}}@endif" id="{{ $section }}">
                                <h2>{{ __('settings.sections.'.$section) }}</h2>
                                <hr class="mb-3r">
                                <div class="section-settings row">
                                    @foreach($settings->where('section', $section) as $setting)
                                        <div class="form-group mb-3r col-lg-6 col-md-12" title="{{$setting->description}}">
                                            <label for="{{ $setting->name }}">{{ __($setting->label) }}</label>
                                            @if ($setting->type === 'text')
                                                <input type="text" name="{{ $setting->name }}" value="{{ $setting->value }}" class="form-control">
                                            @elseif ($setting->type === 'email')
                                                <input type="email" name="{{ $setting->name }}" value="{{ $setting->value }}" class="form-control">
                                            @elseif ($setting->type === 'password')
                                                <input type="password" name="{{ $setting->name }}" value="{{ $setting->value }}" class="form-control">
                                            @elseif ($setting->type === 'number')
                                                <input type="number" name="{{ $setting->name }}" value="{{ $setting->value }}" class="form-control">
                                            @elseif ($setting->type === 'image')
                                                <div class="d-flex flex-column justify-center align-items-center">
                                                    <img src="{{ storage('media', $setting->value) }}" alt="{{ $setting->label }}" onclick="change_image(this)" width="100" height="100" class="img-fluid settings-img">
                                                    <input type="hidden" name="{{ $setting->name }}" value="{{ $setting->value }}">
                                                    <label for="{{ $setting->name }}">{{ __($setting->label) }}</label>
                                                </div>
                                            @elseif ($setting->type === 'textarea')
                                                <textarea name="{{ $setting->name }}" class="form-control">{{ $setting->value }}</textarea>
                                                <label for="{{ $setting->name }}">{{ __($setting->label) }}</label>
                                            @elseif ($setting->type === 'select')
                                                <select name="{{ $setting->name }}" class="form-control bootstrap-select">
                                                    @foreach ($setting->options as $optionValue => $optionLabel)
                                                        <option value="{{ $optionValue }}" @if ($optionValue == $setting->value) selected @endif>{{ $optionLabel }}</option>
                                                    @endforeach
                                                </select>
                                                <label for="{{ $setting->name }}">{{ __($setting->label) }}</label>
                                            @elseif ($setting->type === 'multiselect')
                                                <select name="{{ $setting->name }}[]" class="form-control" multiple>
                                                    @foreach ($setting->options as $optionValue => $optionLabel)
                                                        <option value="{{ $optionValue }}" @if (in_array($optionValue, json_decode($setting->value, true))) selected @endif>{{ $optionLabel }}</option>
                                                    @endforeach
                                                </select>
                                                <label for="{{ $setting->name }}">{{ __($setting->label) }}</label>
                                            @elseif ($setting->type === 'boolean')
                                                <div class="left-right">
                                                    <div>
                                                        <label class="switch-label" for="{{ $setting->name }}">{{ __($setting->label) }}</label>
                                                    </div>
                                                    <div class="text-right">
                                                        <input type="checkbox" name="{{ $setting->name }}" value="1" class="switchery order-settings-switch" id="{{ $setting->name }}" @if ($setting->value == 1) checked @endif>
                                                        <input type="hidden" id="{{ $setting->name }}-hidden" name="{{ $setting->name }}" value="{{ $setting->value == 1 ? 'true' : 'false' }}">
                                                    </div>
                                                </div>
                                            @endif
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>

        <div class="text-left-align">
            <button type="submit" class="btn btn-tiffany" id="submit_btn">@lang('ui.save')</button>
        </div>
    </form>


    <script>
        $(document).ready(function () {
            $('.bootstrap-select').selectpicker();
        });

        const checkboxes = document.querySelectorAll('input[type="checkbox"].order-settings-switch');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                const hiddenInput = document.querySelector(`#${this.id}-hidden`);
                hiddenInput.value = this.checked ? 'true' : 'false';

            });
        });

        function choose_image() {
            return new Promise((resolve, reject) => {

                // Deselect any selected items first
                $('table#media').DataTable().rows().deselect();

                // Show the modal
                $('#mediaModel').modal('show');

                // Attach a click event listener to the insert-image-btn
                $('#mediaModel').on('click', '.insert-image-btn', function () {

                    let selectedRows = $('table#media .selected');

                    let result = '';
                    selectedRows.each(function () {
                        let file_name = $(this).find('td.file span').data('text');
                        let image_size = $('input[name=image_size]:checked').val();
                        let image_url =  "/images/" + image_size + "/" + file_name;
                        result += image_url;
                    });

                    // Close the modal
                    $('#mediaModel').modal('hide');

                    // Resolve the promise with the selected value
                    resolve(result);
                });

                // Attach an event listener for modal hidden event
                $('#mediaModel').on('hidden.bs.modal', function () {
                    // If modal is closed without clicking the button, reject the promise
                    reject(new Error('Modal closed without inserting an image.'));
                });
            });
        }

        function change_image(e) {
            choose_image()
                .then((selected_file) => {
                    e.src = "{!! storage('media', '/') !!}" + selected_file;
                    e.nextElementSibling.value = selected_file;
                })
                .catch((error) => {
                    console.error(error.message);
                });

        }

    </script>

    <!-- Add this HTML code within the <body> section of your web page -->
    <div class="modal fade" id="mediaModel" tabindex="-1" role="dialog" aria-labelledby="mediaModelLabel" aria-hidden="true" data-selection-mode="multi">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mediaModelLabel">@lang('ui.insert_images')</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    @include('admin.layouts.media.dropzone', ['model' => \App\Models\Media::class])
                    @include('components.data-table', ['datatable' => $media_datatable])
                    <script>
                        function custom_table_media(e, settings, json, xhr) {
                            let contents = ``;
                            json.data.forEach((item, index) => {
                                contents += `<div class='media_wrapper custom-row media-custom-row' data-row='${index}'>`;
                                contents += `<img src='{{storage('media', '/images/medium/')}}${item.file}' alt="${item.alt}">`;
                                contents += `</div>`;
                            });
                            return contents;
                        }

                    </script>

                    <div class="text-center d-flex justify-center align-items-center gap-15">
                        <div class="d-flex flex-column">
                            <label for="small_size"><i class="sicon-image" style="font-size: 18px"></i></label>
                            <input type="radio" id="small_size" name="image_size" value="thumbnail">
                        </div>

                        <div class="d-flex flex-column">
                            <label for="medium_size"><i class="sicon-image" style="font-size: 24px"></i></label>
                            <input type="radio" id="medium_size" name="image_size" value="medium" checked>
                        </div>

                        <div class="d-flex flex-column">
                            <label for="large_size"><i class="sicon-image" style="font-size: 30px"></i></label>
                            <input type="radio" id="large_size" name="image_size" value="large">
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">@lang('ui.close')</button>
                    <button type="button" class="btn btn-primary insert-image-btn">@lang('ui.insert')</button>
                </div>
            </div>
        </div>
    </div>

@stop