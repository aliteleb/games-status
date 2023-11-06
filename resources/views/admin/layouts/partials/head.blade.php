<head>
    @stack('head-start')

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <title>{{ $title }}</title>

    @stack('head-style-start')
    <link href="{{asset('backend/css/bootstrap.min.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('backend/css/core.min.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('backend/css/components.min.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('backend/fonts/pingarlt.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('backend/fonts/icons.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('backend/css/custom.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('backend/css/re-custom.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('backend/css/themes/dark.css')}}" rel="stylesheet" type="text/css">
    <!-- Include Toastr CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Readex+Pro&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet">
    @stack('head-style-end')

    @stack('head-meta-start')
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    @stack('head-meta-end')

    @stack('head-script-start')
    <script type="text/javascript" src="https://cdn.assets.salla.network/dash/cp/assets/js/core/libraries/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdn.assets.salla.network/dash/cp/assets/js/core/libraries/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://cdn.assets.salla.network/dash/cp/assets/js/plugins/forms/selects/bootstrap-select.min.js"></script>
{{--    <script type="text/javascript" src="https://cdn.assets.salla.network/dash/js/dashboard.js"></script>--}}
    <script type="text/javascript" src="https://cdn.assets.salla.network/dash/cp/assets/js/plugins/forms/styling/uniform.min.js"></script>
    <script type="text/javascript" src="https://cdn.assets.salla.network/dash/cp/assets/js/plugins/jquery.addrule.js"></script>
    <script type="text/javascript" src="https://cdn.assets.salla.network/dash/cp/assets/js/pages/form_checkboxes_radios.js"></script>
    <script type="text/javascript" src="https://cdn.assets.salla.network/dash/cp/assets/js/core/libraries/jquery-ui.min.js"></script>
    <script type="text/javascript" src="https://cdn.assets.salla.network/dash/cp/assets/js/plugins/forms/styling/switch.min.js"></script>
    <script type="text/javascript" src="https://cdn.assets.salla.network/dash/cp/assets/js/plugins/jquery-confirm/jquery-confirm.js"></script>
    <script type="text/javascript" src="https://cdn.assets.salla.network/dash/cp/assets/js/plugins/ui/jquery.simpler-sidebar.min.js"></script>
    <script type="text/javascript" src="https://cdn.assets.salla.network/dash/cp/assets/js/core/app.js"></script>
    <!-- Include Toastr Script -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script type="text/javascript" src="{{asset('backend/js/main.js')}}"></script>
    @stack('head-script-end')

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @stack('head-end')
</head>
