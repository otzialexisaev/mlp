@php($parsedName = substr($song->name, 0, -4))
<div class="song-menu-container">
    <div class='song-container notextselect'
         data-audio='{{$song->path}}'
         data-songid='{{$song->id}}'
         data-songname='{{$parsedName}}'>{{$parsedName}}
    </div>
</div>