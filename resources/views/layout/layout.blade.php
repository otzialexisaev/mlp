<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    {{--<link rel="javascript" href="{{ asset('js/player/newautoplay.js') }}">--}}
    <link rel="stylesheet" href="{{ asset('css/playercontainer.css') }}">
    <link rel="stylesheet" href="{{ asset('css/songsdisplay.css') }}">
    <link rel="stylesheet" href="{{ asset('css/playlists.css') }}">
    <link rel="stylesheet" href="{{ asset('css/songmenu.css') }}">
    <link rel="stylesheet" href="{{ asset('css/menucore.css') }}">
    {{--<link rel="stylesheet" href="{{ asset('css/test.css') }}">--}}
</head>
<body>
<div class="container">
    @include('inc.navbar')
    @yield('content')
</div>
<script src="/js/jQuery.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
<script src="/js/popper.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
<script src="/js/bootstrap.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
<script src="/js/player/newautoplay.js"></script>
<script src="/js/menus/MenuModulCore.js"></script>
<script src="/js/menus/songMenu.js"></script>
<script src="/js/menus/SongMenuModul.js"></script>
<script src="/js/menus/menu.js"></script>
</body>
</html>