@extends('layout.layout')
@section('content')
    <audio id="audio"></audio>
    @include('player._playercontainer')
    <?php App\Song::displaySongs() ?>
@endsection