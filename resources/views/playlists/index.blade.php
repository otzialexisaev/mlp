@extends('layout.layout')
@section('content')
    <audio id="audio"></audio>
    @include('player._playercontainer')
    @each('playlists._playlistContainer', $playlists, 'playlist')
@endsection