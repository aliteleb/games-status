<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <link rel="canonical" href="{{ url()->current() }}">
    <meta name="csrf_token" content="{{ session()->get('token') !== null? base64_decode(session()->get('token')) : csrf_token() }}"/>
    <link rel="icon" type="image/svg+xml" href="/assets/images/logo.png"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Crack Watcher</title>

    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;700&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;500;600;700;800&display=swap" media="print" onload="this.media='all'">
    <noscript>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;700&display=swap">
    </noscript>

    <script>
        // Pass authentication status and user information to React
        window.authData = {!! json_encode(['isAuthenticated' => auth()->check(), 'user' => new \App\Http\Resources\UserResource(auth()->user())]) !!};
    </script>

    @viteReactRefresh
    @vite('resources/frontend/index.jsx')

</head>
<body class="bg-[#27282e]">
<div id="root" class="flex flex-col justify-between h-screen"></div>
</body>
</html>
