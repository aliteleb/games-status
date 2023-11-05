@extends('admin.layouts.app')

@push('head-end')@endpush

{{-- Page content --}}
@section('content')

    <div class="text-center center-hv">
        <i class="sicon-padlock lock-icon"></i>

        <h1>@lang('messages.unauthorized_access')</h1>
        <p>@lang('messages.unauthorized_access_message')</p>
    </div>
    <style>
        i.lock-icon{
            font-size: 8rem !important;
        }
        .center-hv{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-25%, -50%);
        }
    </style>

@stop
