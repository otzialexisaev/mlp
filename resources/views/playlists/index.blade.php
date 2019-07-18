@extends('layout.layout')
@section('content')
    <audio id="audio"></audio>
    @include('player._playercontainer')
    <div class="playlist-container">
        @each('playlists._playlistContainer', $playlists, 'playlist')
    </div>
@endsection