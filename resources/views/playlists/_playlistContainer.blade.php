@php($url = url("/playlists/{$playlist->id}"))
<div class='playlist-menu-container notextselect' data-link="{{$url}}">
  {{$playlist->name}}
  {{--<a href='{{$url}}'>{{$playlist->name}}</a>--}}
</div>