<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Packages Host') }}</title>
    <script src="{{ mix('/js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
    <style>
        .bg-danger-light{
            background-color: #f2dede !important
        }
        .bg-success-light{
            background-color: #dff0d8 !important
        }
    </style>
</head>
<body class="bg-dark">
    <div id="app">
        <main class="py-4">
            @if (isset($errors) && $errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            @yield('content')
        </main>
    </div>
</body>

</html>