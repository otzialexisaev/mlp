@extends('layout.layout')
@section('content')
    <audio id="audio"></audio>
    @include('player._playercontainer')
    <div class="ost-container">
        @each('songs._songContainer', $songs, 'song')
    </div>
@endsection
@section('jsscripts')
    <script src="/js/menus/dropdowns/SongMenuDropdown.js"></script>
    <script src="/js/menus/menu.js"></script>
@endsection