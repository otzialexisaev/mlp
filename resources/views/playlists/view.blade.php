@extends('layout.layout')
@section('content')
    <audio id="audio"></audio>
    @include('player._playercontainer')
    <div class="songs-grid">
        @each('songs._songContainer', $songs, 'song')
    </div>
@endsection
@section('jsscripts')
    <script src="/js/menus/dropdowns/SongMenuDropdown.js"></script>
    <script src="/js/menus/songsmenudropdown.js"></script>
@endsection