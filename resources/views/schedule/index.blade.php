@extends('layout.layout')
@section('content')
    {!!$content!!}
    <a href="/schedule/create">
      <button>Новое занятие</button>
    </a>
@endsection
@section('jsscripts')
  <script src="/js/calendar.js"></script>
@endsection