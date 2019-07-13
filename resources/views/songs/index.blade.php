@extends('layout.layout')
@section('content')
    <audio id="audio"></audio>
    @include('player._playercontainer')
    <div class='ostContainer'>
        @each('songs._songContainer', $songs, 'song')
    </div>
@endsection