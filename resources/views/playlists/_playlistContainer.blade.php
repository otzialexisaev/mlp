@php($url = url("/playlists/{$playlist->id}"))
<a class='playlistIcon' href='{{$url}}'>{{$playlist->name}}</a>