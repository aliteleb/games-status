@extends('admin.layouts.app')

@push('head-end')@endpush

{{-- Page content --}}
@section('content')

    <div class="container">
        <div class="row">
            @include('components.data-table', ['datatable' => $datatable])
        </div>
    </div>

    <script>

        function choose_image() {
            return new Promise((resolve, reject) => {

                // Deselect any selected items first
                $('table#media').DataTable().rows().deselect();
                $('table#media').data('selection_mode', 'single');

                // Show the modal
                $('#mediaModel').modal('show');

                // Attach a click event listener to the insert-image-btn
                $('#mediaModel').on('click', '.insert-image-btn', function () {

                    let selectedRows = $('table#media .selected');

                    let result = {'indexes' : [], 'data': ''};
                    selectedRows.each(function () {
                        let file_name = $(this).find('td.file span').data('text');
                        result['indexes'].push($(this).data('id'));
                        let image_url = "/images/medium/" + file_name;
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
            choose_image()
                .then((selected_file) => {
                    e.src = "{!! storage('media', '/') !!}" + selected_file.data;
                    e.nextElementSibling.value = selected_file['indexes'][0];
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
                    @include('components.data-table', ['datatable' => \App\Models\Media::datatable()])
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

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">@lang('ui.close')</button>
                    <button type="button" class="btn btn-primary insert-image-btn">@lang('ui.insert')</button>
                </div>
            </div>
        </div>
    </div>

@endsection
