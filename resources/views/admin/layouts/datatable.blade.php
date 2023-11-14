@extends('admin.layouts.app')

@push('head-end')@endpush

{{-- Page content --}}
@section('content')

    <div class="container">
        <div class="row">
            @include('components.data-table', ['datatable' => $datatable])
        </div>
    </div>

@endsection
