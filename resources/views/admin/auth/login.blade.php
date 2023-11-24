<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('backend/images/favicon.png') }}">
    <link rel="stylesheet" href="{{asset('backend/auth/css/bootstrap.min.css')}}" media="all">
    <link href="{{asset('backend/auth/css/style.css')}}" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css2?family=Readex+Pro&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet">
    <title>@lang('auth.dashboard_login')</title>
</head>
<body class="login-page dark">
<script>
    /* Get the value of 'darkmode' from localStorage */
    let darkMode = localStorage.getItem('dark_mode');

    /* Check if the value is true or false */
    if (darkMode === 'true') {
        /* Add 'dark' class to the body element */
        document.body.classList.add('dark');
    } else {
        /* Remove 'dark' class from the body element */
        document.body.classList.remove('dark');
    }
</script>
<section class="h-100">
    <div class="container h-100 form-container">
        <div class="row justify-content-md-center h-100">
            <div class="card-wrapper">
                <div class="brand">
                    <a href="#" target="_blank">
                        <img src="{{ asset('backend/auth/images/1.png') }}" alt="logo" width="100" height="100">
                    </a>
                </div>
                <div class="card fat">

                    <div class="card-body">
                        <br>
                        <h4 class="card-title">@lang('auth.dashboard_login_title')</h4><br>
                        <form method="POST" action="">
                            @csrf
                            <p>@lang('auth.login_to_continue')</p>
                            @if ($errors->any())
                                <div class="alert alert-danger">
                                    <ul class="mb-0">
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
                            <div class="form-group">
                                <label class="d-none" for="email">@lang('ui.email')</label>
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email', env('TEST_USER')) }}" placeholder="@lang('ui.email')" autofocus="">
                            </div>
                            <div class="form-group">
                                <div style="position:relative" id="eye-password-0">
                                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" value="{{ env('TEST_PASS') }}"
                                           placeholder="@lang('ui.password')" data-eye="" style="padding-right: 60px;" required>
                                    <input type="hidden" id="passeye-0">
                                    <div id="passeye-toggle-0" style="position: absolute; right: 10px; top: 11px; padding: 2px 7px; font-size: 12px; cursor: pointer;">
                                        <span class="sicon-eye-off"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="custom-checkbox custom-control">
                                    <input type="checkbox" name="remember" id="remember" class="custom-control-input">
                                    <label for="remember" class="custom-control-label">@lang('ui.remember_me')</label>
                                </div>
                            </div>
                            <div class="form-group m-0">
                                <button type="submit" class="btn btn-primary btn-block">@lang('ui.login')</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

</body>
</html>
