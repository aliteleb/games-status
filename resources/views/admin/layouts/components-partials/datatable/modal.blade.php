{{--<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.5/jquery.validate.min.js"></script>--}}


<!-- Modal -->
<div dir="rtl" class="modal fade" id="modal_{{$datatable->table_name}}" tabindex="-1" role="dialog" aria-labelledby="modelLabel_{{$datatable->table_name}}" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modelLabel_{{$datatable->table_name}}">@lang('datatable.'.$datatable->name.'.add')</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">

                @php
                    $hasFiles = collect($datatable->modal_fields)->contains('file');
                @endphp
                <form id="modal_form_{{ $datatable->table_name }}" action="{{ $datatable->route }}" method="POST" autocomplete="off">

                @foreach($datatable->modal_fields as $name => $data)

                    @php
                        $value = $name;
                        if(isset($datatable->appends[$name]))
                          $name = $datatable->appends[$name];

                          $data = explode('|', $data);
                          $type = $data[0]??'text';
                          $required = $data[count($data) - 1]??'';
                    @endphp

                    @switch($type)
                        @case('text')
                            <div class="form-group">
                                <label for="{{ $name }}" class="col-form-label">{{ __('datatable.' . $datatable->name . '.' . $name) }}:</label>
                                <input type="text" name="{{ $name }}" id="{{ $name }}" class="form-control {{ $required }}" data-value-field="{{ $value }}">
                            </div>
                            @break

                        @case('textarea')
                            <div class="form-group">
                                <label for="{{ $name }}" class="col-form-label">@lang('datatable.'.$datatable->name.'.'.$name):</label>
                                <textarea class="form-control" name="{{ $name }}" data-value-field="{{$value}}" id="{{ $name }}"{{ $required }}></textarea>
                            </div>

                            @break
                        @case('select')
                            @php
                                $select_data = $data[1] ?? '';
                                $model = explode(',', $select_data)[0];
                                $field = explode(',', $select_data)[1];
                                $select_data = $model::pluck($field, 'id')->toArray();
                            @endphp
                                <!-- Handle select field -->
                            <div class="form-group">
                                <label for="{{ $name }}" class="col-form-label">{{ __('datatable.' . $datatable->name . '.' . $name) }}:</label>
                                <select name="{{ $name }}" id="{{ $name }}" class="form-control {{ $required }}" data-value-field="{{ $value}}" placeholder="{{ __('ui.choose_item') }}">
                                    @foreach ($select_data as $optionValue => $optionLabel)
                                        <option value="{{ $optionValue }}">{{ $optionLabel }}</option>
                                    @endforeach
                                </select>

                            </div>
                            @break

                        @case('password')
                            <!-- Handle date field -->
                            <div class="form-group">
                                <label for="{{ $name }}" class="col-form-label">@lang('datatable.'.$datatable->name.'.'.$name):</label>
                                <input type="password" class="form-control" name="{{ $name }}" data-value-field="{{$value}}" id="{{ $name }}" {{ $required }} autocomplete="false">
                            </div>
                            @break

                        @case('number')
                            <!-- Handle number field -->
                            <div class="form-group">
                                <label for="{{ $name }}" class="col-form-label">@lang('datatable.'.$datatable->name.'.'.$name):</label>
                                <input type="number" class="form-control" name="{{ $name }}" data-value-field="{{$value}}" id="{{ $name }}"{{ $required }}>
                            </div>
                            @break

                        @case('email')
                            <!-- Handle email field -->
                            <div class="form-group">
                                <label for="{{ $name }}" class="col-form-label">@lang('datatable.'.$datatable->name.'.'.$name):</label>
                                <input type="email" class="form-control" name="{{ $name }}" data-value-field="{{$value}}" id="{{ $name }}"{{ $required }}>
                            </div>
                            @break

                        @case('date')
                            <!-- Handle date field -->
                            <div class="form-group">
                                <label for="{{ $name }}" class="col-form-label">@lang('datatable.'.$datatable->name.'.'.$name):</label>
                                <input type="date" class="form-control" name="{{ $name }}" data-value-field="{{$value}}" id="{{ $name }}"{{ $required }}>
                            </div>
                            @break

                        @case('boolean')
                            <!-- Handle date field -->
                            <input type="hidden" name="{{ $name }}" class="for-checkbox" value="1">
                            <div class="form-group trigger">
                                <label for="{{ $name }}" class="col-form-label">@lang('datatable.'.$datatable->name.'.'.$name):</label>
                                <input type="checkbox" data-value-field="{{$value}}" id="{{ $name }}" checked/>
                                <label for="{{ $name }}" class="col-form-label trigger-label">@lang('datatable.'.$datatable->name.'.'.$name):</label>
                            </div>
                            @break

                        @case('file')
                            <!-- Handle date field -->
                            <div class="form-group">
                                <label for="{{ $name }}" class="col-form-label">@lang('datatable.'.$datatable->name.'.'.$name):</label>
                                <input type="file" class="form-control" name="{{ $name }}" data-value-field="{{$value}}" id="{{ $name }}"{{ $required }} {{substr($name, -2) === '[]' ? 'multiple' : ''}}>
                            </div>
                            @break

                        @case('media')
                            @php
                                $data = $data[1] ?? '';
                                $width = explode('x', $data)[0];
                                $height = explode('x', $data)[1];
                            @endphp
                                <!-- Handle media field -->
                            <div class="form-group">
                                <div class="d-flex flex-column justify-center align-items-center">
                                    <img src="https://dummyimage.com/{{$data}}/8db4ff/000" data-src="https://dummyimage.com/{{$data}}/8db4ff/000" alt="@lang('datatable.'.$datatable->name.'.'.$name)" onclick="change_image(this)"
                                         class="img-fluid settings-img form-image" width="{{ $width }}" height="{{ $height }}">
                                    <input type="hidden" name="{{ $name }}" data-value-field="{{ $value }}" value="">
                                    <label for="{{ $name }}">{{ __('datatable.'.$datatable->name.'.'.$name) }}</label>
                                </div>
                            </div>
                            @break

                        @default
                            <!-- Handle other field types -->

                    @endswitch
                @endforeach

                </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">@lang('ui.close')</button>
                <button type="button" class="btn btn-primary" id="save_item_{{$datatable->table_name}}">@lang('ui.save')</button>
            </div>
        </div>
    </div>
</div>


{{--@include('admin.layouts.localizations.ar.ajax-validations')--}}
<script>
    $(document).ready(function () {

        // Disable form submission on Enter key press
        $('#modal_form_{{$datatable->table_name}}').on('keydown', function (event) {
            if (event.keyCode === 13) { // Enter key code
                event.preventDefault();
                $('#save_item_{{$datatable->table_name}}').click();
            }
        });

        // Clear previous error messages
        function clearErrorMessages() {
            $('label.error').remove();
        }

        // Handle form submission
        function handleFormSubmission(event) {
            event.preventDefault();
            var form = $('#modal_form_{{$datatable->table_name}}');

            clearErrorMessages();

            // Check if the required fields are filled before submitting
            // var validator = $("#modal_form_{{$datatable->table_name}}").validate();
            // if (!validator.form()) return;

            // Send AJAX request to the server
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $('#ajaxLoader').show();
            let formData = new FormData(document.getElementById('modal_form_{{$datatable->table_name}}'));
            let url = $('#modal_form_{{$datatable->table_name}}').attr('action');
            let method = $('#modal_form_{{$datatable->table_name}}').attr('method');

            $.ajax({
                type: method,
                url: url,
                data: form.serialize(),
                processData: true,
                success: handleFormSuccess,
                error: handleFormError
            });

        }

        // Handle successful form submission
        function handleFormSuccess(response) {
            $('#ajaxLoader').hide();
            // Handle the response data here
            $('#{{$datatable->table_name}}').DataTable().ajax.reload();
            // Close the modal
            toastr.success(response.message);
            $('#modal_{{$datatable->table_name}}').modal('hide');
        }

        // Handle form submission error
        function handleFormError(error) {
            $('#ajaxLoader').hide();
            if (error.responseJSON && error.responseJSON.errors) {
                var errors = error.responseJSON.errors;
                // Loop through errors and display them under respective inputs
                $.each(errors, function (field, messages) {
                    if (field.split(".").length > 1)
                        field = field.split(".")[0] + '[]';

                    var input = $('[name="' + field + '"]');
                    var errorHtml = '<label class="error">' + messages.join('<br>') + '</label>';
                    input.after(errorHtml);

                });
            } else {
                handleError(error)
            }
        }

        // Reset form on modal show
        function resetFormOnModalShow() {
            clearErrorMessages();
            $('#modal_form_{{$datatable->table_name}}')[0].reset();

            $('#modal_form_{{$datatable->table_name}} .form-image').attr('src', $('#modal_form_{{$datatable->table_name}} .form-image').attr('data-src'));

            @if(isset($datatable->actions['edit_item']))

            var editId = $('#modal_{{$datatable->table_name}}').attr('edit-id');
            if (typeof editId !== 'undefined' && editId !== false) {
                if (editId !== '') {
                    $('#ajaxLoader').show();
                    // Make an AJAX request to fetch data based on the ID
                    $.ajax({
                        url: '{!! $datatable->route !!}/' + editId, // Replace with the actual URL
                        type: 'GET',
                        success: handleFetchDataSuccess,
                        error: handleError
                    });
                }
            }

            @endif

        }

        // Handle successful data fetch
        function handleFetchDataSuccess(response) {
            $('#ajaxLoader').hide();
            $.each(response, function (key, value) {

                let formField = document.querySelector('#modal_{{$datatable->table_name}} *[data-value-field=' + key + ']');
                if (formField) {

                    // Handle triggers
                    if (formField.getAttribute('type') === 'hidden' && formField.classList.contains('for-checkbox')) {
                        if (value === 1) {
                            formField.next().find('input').prop('checked', true)
                        }
                        if (value === 0) {
                            formField.next().find('input').prop('checked', false)
                        }
                    }

                    // Handle images
                    if (formField.getAttribute('type') === 'hidden' && formField.previousElementSibling.getAttribute('src') !== undefined) {
                        formField.previousElementSibling.setAttribute('src', value)
                    }

                    formField.value = value;
                }

            });

            $.each(response, function (key, value) {
                let formField = document.querySelector('#modal_{{$datatable->table_name}} *[name=' + key + ']');
                if(formField)
                    formField.value = value;
            });

        }

        // Handle success
        function handleSuccess(response) {
            $('#ajaxLoader').hide();
            // Display success notification using Toastr
            toastr.success(response.message);
            // Reload or update the DataTable as needed
            dt.ajax.reload();
        }

        // Handle errors
        function handleError(error) {
            $('#ajaxLoader').hide();
            if (error.responseJSON && error.responseJSON.status && error.responseJSON.message) {
                toastr.error(error.responseJSON.message);
            } else {
                toastr.error('@lang("datatable.process_error")');
            }
            if (error.responseJSON && error.responseJSON.error_message && error.responseJSON.error_message == "unauthenticated") {
                location.href = '{{ route('admin.login') }}';
            }
        }

        // Attach event listeners
        $('#save_item_{{$datatable->table_name}}').click(handleFormSubmission);
        $('#modal_{{$datatable->table_name}}').on('show.bs.modal', resetFormOnModalShow);

        // Checkboxes synchronization
        var checkboxes = $('#modal_{{$datatable->table_name}} input[type=checkbox]');
        var hiddenInputs = $('#modal_{{$datatable->table_name}} input[type=hidden].for-checkbox');
        checkboxes.each(function (index) {
            hiddenInputs.eq(index).val($(this).prop('checked') ? 1 : 0);
        });
        checkboxes.on('change', function () {
            var checkboxIndex = checkboxes.index(this);
            hiddenInputs.eq(checkboxIndex).val($(this).prop('checked') ? 1 : 0);
        });


    });

</script>
