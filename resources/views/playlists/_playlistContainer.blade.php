<div class='playlist-grid-item notextselect'
     data-id="{{$playlist->id}}"
     data-playlistName="{{$playlist->name}}"
>{{$playlist->name}}</div>
@section('jsscripts')
  <script src="/js/menus/moduls/PlaylistSettingsModul.js"></script>
  <script src="/js/menus/dropdowns/PlaylistDropdown.js"></script>
  <script src="/js/menus/playlistsMenu.js"></script>
@endsection