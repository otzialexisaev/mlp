@php($parsedName = substr($song->name, 0, -4))
<div class='songContainer noselect'
     data-audio='{{url("/")}}/{{$song->path}}{{$song->name}}'
     data-songid='{{$song->id}}'
     data-songname='{{$parsedName}}'>{{$parsedName}}
</div>