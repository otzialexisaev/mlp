<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>Document</title>
    {{--<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"--}}
          {{--integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">--}}

    {{--<link rel="javascript" href="{{ asset('js/player/newautoplay.js') }}">--}}
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/main.css') }}">
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
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script src="/js/player/newautoplay.js"></script>
<script src="/js/menus/moduls/MenuModulCore.js"></script>
<script src="/js/menus/moduls/AddSongModul.js"></script>
<script src="/js/menus/moduls/AddToPlaylistMenuModul.js"></script>
<script src="/js/menus/moduls/SongMenuModul.js"></script>
<script src="/js/menus/moduls/AddPlaylistsModul.js"></script>
<script src="/js/inputs/InputsCore.js"></script>
<script src="/js/inputs/Textfield.js"></script>
<script src="/js/inputs/FileUpload.js"></script>
<script src="/js/inputs/PlaylistMultipleSelect.js"></script>
<script src="/js/utils/Xhr.js"></script>
@yield('jsscripts')
</body>
</html>