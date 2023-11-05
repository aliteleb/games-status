@php
    use App\Models\Media;
    $media_class = Media::class;
@endphp

@extends('admin.layouts.app')

@push('head-end')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/css/bootstrap-grid.rtl.min.css"
          integrity="sha512-O0LJksijgJLiKH5dDSIH0z9NuZvuiA/ON1nTFDtjTQ6lS0W0N4JptZxpnKJR5cVwyU0Nc3i6t/InaUbOrM6JPg==" crossorigin="anonymous" referrerpolicy="no-referrer"/>

    <script src="{{ asset('backend/js/tinymce/tinymce.min.js') }}" referrerpolicy="origin"></script>

    <!-- ... other scripts ... -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>

    <!-- Other meta tags and styles -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.13.3/css/selectize.min.css" rel="stylesheet">
    <!-- ... other scripts ... -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.13.3/js/standalone/selectize.min.js"></script>
@endpush

@section('content')

    <div class="container f-w">

        {!! Form::open(['route' => isset($post) ? ['admin.posts.update', $post] : 'admin.posts.store', 'method' => isset($post) ? 'PUT' : 'POST']) !!}

        <div class="d-flex flex-wrap">
            <div class="col col-9 p-2">
                <div class=" mb-3">
                    {!! Form::text('title', old('title', $post->title ?? ''), ['class' => 'form-control  form-control-lg', 'placeholder' => __('ui.post_title')]) !!}
                    @error('title')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class=" mb-3">
                    <div dir="ltr" class="input-group p-0">
                        <span class="input-group-addon">{{config('app.url')}}/</span>
                        {!! Form::text('slug', old('slug', $post->slug ?? ''), ['dir'=> 'ltr', 'class' => 'form-control   form-control-lg', 'placeholder' => __('ui.post_slug')]) !!}
                    </div>
                    @error('slug')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class=" mb-3">
                    <textarea name="body" id="post_editor">{{ old('body', $post->body ?? '') }}</textarea>
                    @error('body')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>
            <div class="col col-3 text-center post-side pt-4">

                <div class="mb-5">
                    <button type="submit" class="btn btn-success"> @lang('ui.save') </button>
                </div>

                <div class="d-flex flex-column justify-center align-items-center mb-3">
                    {!! Form::label('featured_image',  __('ui.featured_image')) !!}
                    <img src="{{ isset($post) && isset($post->post_image)? storage('media', '/images/medium/'.$post->post_image->file) : (strlen(old('featured_image') > 0) ? storage('media', '/images/medium/'.old('featured_image')) : 'https://dummyimage.com/300x180/8db4ff/000') }}" onclick="change_image(this)" data-modal-selection="single" data-modal-field="id" width="260"
                         height="140" class="img-fluid settings-img">
                    {{ Form::hidden('featured_image', isset($post) ? $post->featured_image : '') }}
                    @error('featured_image')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-5">
                    {!! Form::label('category_id',  __('ui.category')) !!}
                    {!! Form::select('category_id', $categories, old('category_id', $post->category_id ?? null), ['class' => 'form-control form-control-lg category_id']) !!}
                    @error('category_id')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-5">
                    {!! Form::label('keywords',  __('ui.keywords')) !!}
                    {!! Form::text('keywords', old('keywords', $post->keywords ?? ''), ['class' => 'keywords-input', 'placeholder' => __('ui.keywords')]) !!}
                    @error('keywords')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    {!! Form::label('excerpt',  __('ui.post_excerpt')) !!}
                    {!! Form::textarea('excerpt', old('excerpt', $post->excerpt ?? ''), ['class' => 'form-control  form-control-lg', 'placeholder' => __('ui.post_excerpt')]) !!}
                    @error('excerpt')
                    <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

            </div>
        </div>


        {!! Form::close() !!}

        <script>
            tinymce.init({
                selector: '#post_editor', // Use a class to target elements for inline editing
                // inline: true, // Enable inline editing
                plugins: [
                    'lists', 'link', 'image', 'imagetools', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',"paste",
                    'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount', 'directionality', 'autoresize', 'code',
                ],
                toolbar: 'insertImage link | bold italic underline hr | checklist | fontsizeselect formatselect | alignright aligncenter alignleft alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | fontsize blocks | ltr rtl  strikethrough blockquote | table insertdatetime code ',
                contextmenu: 'link insertImage image imagetools',
                toolbar_sticky: true,
                menubar: false, // Hide the menu bar
                language: 'ar', // Set the language to 'ar' for Arabic
                language_url: '{{ asset('backend/js/tinymce/langs/ar.js') }}', // Adjust the path to the language file
                autosave_interval: '3s', // Autosave interval
                skin: localStorage['dark_mode'] === 'true' ? "oxide-dark" : '',
                content_css: localStorage['dark_mode'] === 'true' ? "dark" : '',
                min_height: 600, // Set the minimum height to 600px
                convert_urls: false,
                paste_as_text: true,
                content_style: `
                    @import url('https://fonts.googleapis.com/css2?family=Readex+Pro&display=swap');
                    body { font-family: Readex Pro,sans-serif; } a { text-decoration: none }
                    `,
                setup: function (editor) {

                    // Focus the caret on initialization
                    editor.on('init', function () {
                        // editor.focus();
                        $('.tox-tinymce').css('opacity', '1');
                    });

                    editor.ui.registry.addButton('insertImage', {
                        icon: 'image',
                        onAction: function (_) {
                            choose_images()
                                .then((selected_files) => {
                                    editor.insertContent(selected_files);
                                })
                                .catch((error) => {
                                    console.error(error.message);
                                });
                        }
                    });
                    editor.ui.registry.addMenuItem('insertImage', {
                        icon: 'image',
                        text: 'Change Image',
                        onAction: function (_) {
                            choose_images()
                                .then((selected_files) => {
                                    editor.insertContent(selected_files);
                                })
                                .catch((error) => {
                                    console.error(error.message);
                                });
                        }
                    });

                    function choose_images() {

                        return new Promise((resolve, reject) => {

                            $('table#media').data('selection_mode', 'multiple');

                            // Deselect any selected items first
                            $('table#media').DataTable().rows().deselect();

                            // Show the modal
                            $('#mediaModel').modal('show');
                            $('.media-sizes').show();

                            // Attach a click event listener to the insert-image-btn
                            $('#mediaModel').on('click', '.insert-image-btn', function () {

                                let selectedRows = $('table#media .selected');

                                let result = '';
                                selectedRows.each(function () {
                                    let file_name = $(this).find('td.file span').data('text');
                                    let image_alt = $(this).find('td.alt span').data('text');
                                    let image_size = $('input[name=image_size]:checked').val();
                                    let image_url = "{!! storage('media', '/images/') !!}" + image_size + "/" + file_name;

                                    // Create temp image to get naturalWidth and naturalHeight
                                    let img = document.createElement("img");
                                    img.setAttribute('src', image_url);

                                    // If user selected image get the style from it and apply to new images
                                    let selectedHtml = tinyMCE.activeEditor.selection.getContent();
                                    let styleAttributeValue = ``;
                                    if (selectedHtml.length > 0) {
                                        let parser = new DOMParser();
                                        let doc = parser.parseFromString(selectedHtml, 'text/html');
                                        let imgElement = doc.querySelector('img');
                                        styleAttributeValue = imgElement.getAttribute('style');
                                    }

                                    // Append to html
                                    result += `<img src="${image_url}" alt="${image_alt}" width="${img.naturalWidth}" height="${img.naturalHeight}" style="${styleAttributeValue}"><br>`;
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


                },
            });

            $('select.category_id').select2({
                "language": {
                    "noResults": function () {
                        return "@lang('messages.no_results_found')";
                    }
                },
            });

            $('.keywords-input').selectize({
                // persist: false,
                createOnBlur: true,
                create: true,
                delimiter: ',',
                placeholder: "@lang('ui.keywords') ......",
                render: {
                    option_create: function (data, escape) {
                        return `<div class="create"> + @lang('ui.add') <b>${data.input}</b> </div>`;
                    }
                },
                onChange: function (value) {
                    $(".selectize-input input[placeholder]").attr("style", "width: 100%;");
                },
            });

            function choose_image(sender) {

                return new Promise((resolve, reject) => {
                    $('table#media').data('selection_mode', 'single');

                    // Deselect any selected items first
                    $('table#media').DataTable().rows().deselect();

                    // Show the modal
                    $('#mediaModel').modal('show');
                    $('.media-sizes').hide();

                    // Attach a click event listener to the insert-image-btn
                    $('#mediaModel').on('click', '.insert-image-btn', function () {

                        let selectedRows = $('table#media .selected');

                        let result = {'indexes' : [], 'data': ''};
                        selectedRows.each(function () {
                            let file_name = $(this).find('td.file span').data('text');
                            result['indexes'].push($(this).data('id'));
                            let image_size = $('input[name=image_size]:checked').val();
                            let image_url = "/images/" + image_size + "/" + file_name;
                            result['data'] += image_url;
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

                choose_image(e)
                    .then((selected_files) => {
                        e.src = "{!! storage('media', '/') !!}" + selected_files.data;
                        e.nextElementSibling.value = selected_files['indexes'][0];
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

                        @include('admin.layouts.media.dropzone', ['model' => $media_class])
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

                        <div class="media-sizes">
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

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">@lang('ui.close')</button>
                        <button type="button" class="btn btn-primary insert-image-btn">@lang('ui.insert')</button>
                    </div>
                </div>
            </div>
        </div>

        <style>
            label.app-url b {
                font-family: math;
                color: #999;
                font-size: 1.5rem;
            }
        </style>

    </div>
@stop
