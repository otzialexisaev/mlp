@php($parsedName = substr($song->name, 0, -4))
<div class="song-menu-container" style="position: relative; height: 100%;">
    <div class='songContainer noselect'
         data-audio='{{url("/")}}/{{$song->path}}{{$song->name}}'
         data-songid='{{$song->id}}'
         data-songname='{{$parsedName}}'>{{$parsedName}}
    </div>
</div>