@extends('layout.layout')
@section('content')
    <audio id="audio"></audio>
    @include('player._playercontainer')
    @include('inc.topmenu')
    <div class='ost-container'>
        @each('songs._songContainer', $songs, 'song')
    </div>
@endsection