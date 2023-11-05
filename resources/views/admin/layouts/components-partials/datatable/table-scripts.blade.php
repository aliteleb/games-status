<script>

$( document ).ready(function() {

        {{-- Initialize the datatable --}}
    let table = $('#{{$datatable->table_name}}').DataTable({
        processing: true,
        serverSide: true,
        pageLength: localStorage['table_{{$datatable->table_name}}'] !== undefined ? localStorage['table_{{$datatable->table_name}}'] : 15,
        lengthMenu: [[10, 15, 25, 50, -1], [10, 15, 25, 50, "@lang('ui.all')"]],
        ajax: '{!! $datatable->route !!}',

        columns: [

                {{-- Checkbox multiselect column --}}
                @if($datatable->multiselect)
            {
                data: null,
                className: "select-checkbox",
                defaultContent: '',
                orderable: false,
                searchable: false
            },
                @endif

                {{---------- Columns --}}
                @foreach($datatable->columns as $column)
            {
                data: '{{$column}}', name: '@if(isset($datatable->appends[$column])){{$datatable->appends[$column]}}@else{{$column}}@endif', className: '{{str_replace('.', '_', $column)}}', render: (data) => {
                    if (data !== undefined && data !== null)
                        return `<span data-text="${data}">${data}<span>`;
                    else
                        return `ــــــــ`;
                },

            },
                @endforeach
                {{-- Columns ----------}}

                {{---------- Actions  column --}}
                @if(count($datatable->actions) > 0)
            {
                data: null,
                orderable: false,
                className: 'actions',
                render: function () {
                    return `@foreach($datatable->actions as $action_name => $action)
                    <button class="btn btn-secondary {{$action_name}}" onclick="{{$action_name}}_{{$datatable->table_name}}(this)" data-method="{{$action["method"] ?? ''}}">
                                    <i class="sicon-{{$action["icon"]}}"></i>
                                </button>
                            @endforeach
                    `;
                }
            },
                @endif
                {{-- Actions  column ----------}}

            {
                data: null,
                defaultContent: '',
                className: 'control actions',
                orderable: false,
                searchable: false
            },
        ],

        {{-- After row created logic --}}
        createdRow: function (row, data, dataIndex) {
            $(row).attr('data-id', data.id);
            $(row).find('.actions button').attr('data-id', data.id);
        },

        {{-- Hide show more columns button --}}
        columnsDef: [
            {
                targets: -1,
                visible: false
            },
        ],

        {{-- Show more columns button --}}
        responsive: {
            details: {
                type: 'column',
                target: -1
            }
        },
        "language": lang, {{--  https://cdn.datatables.net/plug-ins/1.13.6/i18n/ar.json For Arabic language --}}

        select: {
            style: '@if($datatable->multiselect){{'multi'}}@else{{'single'}}@endif',
            selector: 'td:first-child'
        },

        order: [],
        dom: 'Blfrtip',
        buttons: [

                @foreach($datatable->buttons as $button)
            {
                extend: '{{$button}}',
                text: '@lang('datatable.'.$button)',
                className: '{{$button}}',
            },
                @endforeach

                {{-- Add items --}}
                @if($datatable->add)
            {
                text: "@lang('datatable.'.$datatable->name.'.add') <i class='sicon-add-circle'></i>",
                action: (e, dt, node, config) => add_{{$datatable->table_name}}(e, dt, node, config),
                attr: {
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#modal_{{$datatable->table_name}}',
                },
                className: 'add',
            },
                @endif

                {{-- Bulk Edit items --}}
                @if($datatable->bulk_edit)
            {
                text: "@lang('datatable.'.$datatable->name.'.edit') <i class='sicon-edit-square'></i>",
                action: (e, dt, node, config) => add_{{$datatable->table_name}}(e, dt, node, config),
                attr: {
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#modal_{{$datatable->table_name}}',
                },
                className: 'edit',
            },
                @endif

                {{-- Delete rows --}}
                @if($datatable->delete)
            {
                text: "@lang('datatable.'.$datatable->name.'.delete') <i class='sicon-trash-2'></i>",
                action: (e, dt, node, config) => delete_{{$datatable->table_name}}(e, dt, node, config),
                className: 'delete',
            },
            @endif

        ],


    }).on('xhr.dt', function (e, settings, json, xhr) {

        {{-- Handle Errors --}}
        if (xhr.status !== 200) {
            // Redirect to login page if not authenticated --}}
            if (xhr.responseJSON && xhr.responseJSON.error_message && xhr.responseJSON.error_message == "unauthenticated")
                location.href = '{{ route('admin.login') }}';

                {{-- Handle doesn't have the permission --}}
            else if (xhr.responseJSON && xhr.responseJSON.error_message && xhr.responseJSON.error_message == "unauthenticated")
                location.href = '{{ route('admin.login') }}';

                {{-- Unknown error --}}
            else {
                if (xhr.responseJSON && xhr.responseJSON.status && xhr.responseJSON.message) {
                    toastr.error(xhr.responseJSON.message);
                } else {
                    toastr.error('@lang("datatable.process_error")');
                }
            }
        }

        {{-- Create custom table --}}
        if (typeof (custom_table_{{$datatable->name}}) == 'function') {

            let custom_table = $('.custom_table_{{$datatable->table_name}}');
            if (custom_table.length === 0) {
                custom_table = $(`<div class='custom_table_{{$datatable->table_name}}'></div>`);
                $("table#{{$datatable->table_name}}").after(custom_table);
            }

            {{-- Remove the click event handler from .custom-row elements --}}
            $(document).off('click', '.{{$datatable->table_name}}-custom-row');

            {{-- Empty the table --}}
            custom_table.empty();

            let custom_html = custom_table_{{$datatable->name}}(e, settings, json, xhr);
            custom_table.html(custom_html);

            $(document).on('click', '.{{$datatable->table_name}}-custom-row', function () {
                let id = $(this).attr('data-row');

                if ($(this).attr('selected') === 'selected')
                    table.row(id).deselect();
                else
                    table.row(id).select();

            });
        }


        {{-- On selection change --}}
    }).on('select deselect', function (e, dt, type, indexes) {

        if (e.type === 'select' && type === 'row') {

            if($('table#{{$datatable->table_name}}').data('selection_mode') === 'single'){
                table.rows({ selected: true }).every(function () {
                    if (this.index() !== indexes[0]) {
                        this.deselect();
                    }
                });
            }

            indexes.forEach(index => {
                $('.custom-row[data-row=' + index + ']').attr('selected', true);
            });
        }
        if (e.type === 'deselect' && type === 'row') {
            indexes.forEach(index => {
                $('.custom-row[data-row=' + index + ']').removeAttr('selected');
            });
        }

        {{-- On menu length change --}}
    }).on('length.dt', function (e, settings, len) {

        localStorage.setItem('table_{{$datatable->table_name}}', len); // Store the selected length in LocalStorage
    });
});

    {{-- Disable datatable alert error --}}
        $.fn.dataTable.ext.errMode = 'none';

    {{-- Listen for the draw.dt event --}}
    $('#{{$datatable->table_name}}').on('draw.dt', function (e, settings) {

        if ($('#{{$datatable->table_name}} .select-all').prop('checked')) {
            let dt = $('#{{$datatable->table_name}}').DataTable();
            if (dt !== undefined)
                dt.rows().select();

        }

    });

    {{-- Select or deselect all rows when the select-all button is clicked --}}
    $('#{{$datatable->table_name}} .select-all').click(() => {

        let dt = $('#{{$datatable->table_name}}').DataTable();

        if ($('#{{$datatable->table_name}} .select-all').prop('checked')) {
            dt.rows().select();
        } else {
            dt.rows().deselect();
        }

    });



    {{-- Handle success --}}
    function handleSuccess_{{$datatable->table_name}}(response) {
        $('#ajaxLoader').hide();
        {{-- Display success notification using Toastr --}}
        toastr.success(response.message);
        {{-- Reload or update the DataTable as needed --}}
        $('#{{$datatable->table_name}}').DataTable().ajax.reload();
        console.log('#{{$datatable->table_name}}');
    }

    {{-- Handle errors --}}
    function handleError_{{$datatable->table_name}}(error) {
        {{-- console.log(error); --}}
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

    {{-- Start Actions --}}
    function add_{{$datatable->table_name}}(e, dt, node, config) {

        @if($datatable->add_method == "view")
            {{-- View method --}}
            location.href = "{!! $datatable->route !!}/create";
        return;
        @endif

        $('#modelLabel_{{$datatable->table_name}}').text('@lang('datatable.'.$datatable->name.'.add')');
        $('#modal_{{$datatable->table_name}}').removeAttr('edit-id');

        $('#modal_form_{{$datatable->table_name}}').attr('action', '{!! $datatable->route !!}');
        $('#modal_form_{{$datatable->table_name}}').attr('method', 'POST');

        $("#modal_{{$datatable->table_name}}").modal();

    }

    function edit_item_{{$datatable->table_name}}(sender) {

        // Retrieve the id --}}
        $('#modelLabel_{{$datatable->table_name}}').text('@lang('datatable.'.$datatable->name.'.edit')');
        let id = sender.getAttribute('data-id');

        {{-- If custom row selected prevent change --}}
        if (sender.parentNode.getAttribute('selected') === 'selected')
            sender.parentNode.removeAttribute('selected')
        else
            sender.parentNode.setAttribute('selected', 'selected');

        {{-- check if responsive mode --}}
        let parent_row = sender.parentNode.parentNode.parentNode.parentNode.parentNode;
        if (parent_row.classList.contains('child'))
            id = sender.parentNode.parentNode.parentNode.parentNode.parentNode.previousElementSibling.getAttribute('data-id');

        $('#modal_{{$datatable->table_name}}').attr('edit-id', id);

        @if(isset($datatable->actions['edit_item']) && isset($datatable->actions['edit_item']['method']) && $datatable->actions['edit_item']['method'] == "view")

            {{-- View method --}}
            location.href = "{!! $datatable->route !!}/" + id + "/edit";
        return;
        @endif

        {{-- Modal method --}}
        $('#modal_form_{{$datatable->table_name}}').attr('action', '{!! $datatable->route !!}/' + id);
        $('#modal_form_{{$datatable->table_name}}').attr('method', 'PUT');

        $("#modal_{{$datatable->table_name}}").modal();
    }

    function delete_item_{{$datatable->table_name}}(sender) {

        var selectedIds = [sender.dataset.id];

        if (selectedIds.length === 0) {
            toastr.warning('@lang("datatable.no_rows_selected")');
            return;
        }

        {{-- Use SweetAlert2 for confirmation --}}
        Swal.fire({
            title: '@lang("ui.delete_confirmation_text")',
            text: '@lang("ui.delete_confirmation_message")',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '@lang("ui.delete")',
            cancelButtonText: '@lang("ui.cancel")'
        }).then((result) => {
            if (result.isConfirmed) {
                $('#ajaxLoader').show();
                {{-- Send AJAX request to delete selected rows --}}
                $.ajax({
                    type: 'DELETE',
                    url: '{!! $datatable->route !!}/' + selectedIds,
                    data: {
                        _token: $('meta[name="csrf-token"]').attr('content'),
                        ids: selectedIds
                    },
                    success: handleSuccess_{{$datatable->table_name}},
                    error: handleError_{{$datatable->table_name}}
                });
            }
        });

    }

    function delete_{{$datatable->table_name}}(e, dt, node, config) {
        var selectedRows = $('#{{$datatable->table_name}} .selected');
        var selectedIds = selectedRows.map(function () {
            return $(this).data('id');
        }).get();

        if (selectedIds.length === 0) {
            toastr.warning('@lang("datatable.no_rows_selected")');
            return;
        }

        {{-- Use SweetAlert2 for confirmation --}}
        Swal.fire({
            title: '@lang("ui.delete_confirmation_text")',
            text: '@lang("ui.delete_confirmation_message")',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '@lang("ui.delete")',
            cancelButtonText: '@lang("ui.cancel")'
        }).then((result) => {
            if (result.isConfirmed) {
                $('#ajaxLoader').show();
                {{-- Send AJAX request to delete selected rows --}}
                $.ajax({
                    type: 'DELETE',
                    url: '{!! $datatable->route !!}/' + selectedIds,
                    data: {
                        _token: $('meta[name="csrf-token"]').attr('content'),
                        ids: selectedIds
                    },
                    success: handleSuccess_{{$datatable->table_name}},
                    error: handleError_{{$datatable->table_name}}
                });
            }
        });
    }

    {{-- End Actions --}}

</script>
