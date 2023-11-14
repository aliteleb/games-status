@extends('admin.layouts.app')

@section('content')

    <form action="{{ route('admin.roles.store') }}" method="POST" class="permissions-form">
        @csrf
        @include('admin.roles.form')
    </form>

@endsection
