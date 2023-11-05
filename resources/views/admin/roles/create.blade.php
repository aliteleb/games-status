@extends('admin.layouts.app')

@section('content')

    {!! Form::open(['route' => 'admin.roles.store', 'method' => 'POST', 'class' => 'permissions-form']) !!}
    @include('backend.roles.form')
    {!! Form::close() !!}

@endsection
