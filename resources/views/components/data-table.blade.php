@if($datatable->custom_table)
    <style> #{{$datatable->table_name}} { display: none; } </style>
@endif

<table id="{{$datatable->table_name}}" class="table table-striped dt dt-responsive" style="width:100%">
    <thead class="thead_dark">
    <tr>

        @if($datatable->multiselect)
            <th class="th_text">
                <input type="checkbox" class="select-all">
            </th>
        @endif

        @foreach($datatable->columns as $column)
            <th class="th_text {{str_replace('.', '_', $column)}}">@lang('datatable.'.$datatable->name.'.'.str_replace('.', '_', $column))</th>
        @endforeach

        @if(count($datatable->actions) > 0)
            <th class="th_text">@lang('ui.actions')</th>
        @endif

        <th class="show-more-columns"><i class="sicon-ellipsis-vertical-filled"></i></th>

    </tr>
    </thead>
</table>

<script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/responsive/2.2.3/js/dataTables.responsive.min.js"></script>

<!-- Buttons -->
<script src="https://cdn.datatables.net/buttons/2.0.1/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.0.1/js/buttons.bootstrap5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.0.1/js/buttons.print.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.0.1/js/buttons.html5.min.js"></script>
<!-- Buttons -->

<!-- Include SweetAlert2 Script -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/11.7.20/sweetalert2.all.min.js"></script>

<script src="https://cdn.datatables.net/select/1.3.3/js/dataTables.select.min.js"></script>


@include('admin.layouts.localizations.ar.datatable')

@include('admin.layouts.components-partials.datatable.table-scripts', ['datatable' => $datatable])

@if(isset($datatable->add) || isset($datatable->actions['edit']))
    @include('admin.layouts.components-partials.datatable.modal', ['datatable' => $datatable])
@endif

@include('admin.layouts.localizations.all.datatable')
