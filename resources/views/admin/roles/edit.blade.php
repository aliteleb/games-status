@extends('admin.layouts.app')

@section('content')

    <form action="{{ route('admin.roles.update', $role->id) }}" method="POST" class="permissions-form">
        @method('PUT')
        @csrf
        @include('admin.roles.form')
    </form>


@endsection

