@extends('layout.layout')
@section('content')
    <audio id="audio"></audio>
    @include('player._playercontainer')
    @include('inc.playliststopmenu')
    <div class="playlist-grid">
        @each('playlists._playlistContainer', $playlists, 'playlist')
    </div>
@endsection
@section('jsscripts')
    <script src="/js/menus/playliststopmenu.js"></script>
    <script src="/js/menus/moduls/PlaylistSettingsModul.js"></script>
    <script src="/js/menus/dropdowns/PlaylistDropdown.js"></script>
    <script src="/js/menus/playlistsMenu.js"></script>
@endsection