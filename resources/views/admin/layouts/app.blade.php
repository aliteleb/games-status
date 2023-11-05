<!DOCTYPE html>
<html lang="ar" dir="rtl">

<!-- Head content goes here -->
@include('admin.layouts.partials.head')

<body class="{{ session('dark_mode') ? 'dark' : '' }}">

<!-- Navigation, Header elements -->
@include('admin.layouts.partials.header')

<div id="page_container" class="page-container">

    <div class="page-content">

        @include('admin.layouts.partials.sidebar')

        <div class="content-wrapper" id="content_box">

            @include('admin.layouts.partials.page-header')

            <!-- Main content -->
            <div class="content ">

                @include('admin.layouts.partials.alerts')

                @yield('content')

            </div>

        </div>


    </div>

@include('admin.layouts.partials.scripts')

</body>
</html>

