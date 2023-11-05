@extends('admin.layouts.app')

@push('head-end')
{{-- Page content --}}
@section('content')

    <div class="container">
        <div class="row">

            <script>
                function custom_table_media(e, settings, json, xhr) {
                    let contents = ``;
                    json.data.forEach((item, index) => {
                        console.log(item.file);
                        contents += `<div class='media_wrapper custom-row media-custom-row' data-row='${index}'>`;
                        contents += `<img src='{{storage('media', '/images/medium/')}}${item.file}' alt="${item.alt}">`;
                        contents += `<button class="btn btn-secondary edit_item" onclick="edit_item_media(this)" data-method="modal" data-id="${item.id}">
                                <i class="sicon-edit"></i>
                            </button>`;
                        contents += `</div>`;
                    });
                    return contents;
                }
            </script>

            @include('admin.layouts.media.dropzone')
            @include('components.data-table', ['datatable' => \App\Models\Media::class::datatable()])

        </div>
    </div>

@stop
