@extends('admin.layouts.app')

@section('content')

    {!! Form::model($role, ['route' => ['admin.roles.update', $role->id], 'method' => 'PUT', 'class' => 'permissions-form']) !!}
    @include('backend.roles.form')
    {!! Form::close() !!}

@endsection

