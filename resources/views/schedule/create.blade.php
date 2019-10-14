@extends('layout.layout')
@section('content')
  <?php
  $date = (isset($object['date'])) ? $object['date'] : '';
  $subject = (isset($object['subject'])) ? $object['subject'] : '';
  $visited = (isset($object['visited'])) ? ($object['visited'] == 1) ? 'checked' : '' : '';
  ?>
  <form method="POST" action="/schedule/create">
    <br>
    <br>
    <label for="date">Дата: (YYYY-MM-DD)
      <input name="date" type="text" value="{{$date}}">
    </label>
    <br>
    <br>
    <label for="visited">Посетил:
      <input name="visited" type="checkbox" {{$visited}}>
    </label>
    <br>
    <br>
    <label for="subject">Предмет:
      <input name="subject" type="text" value="{{$subject}}">
    </label>
    <br>
    <br>
    <input type="hidden" name="_token" id="csrf-token" value="{{ Session::token() }}" />
    <input type="submit">
  </form>
@endsection
@section('jsscripts')
  <script src="/js/calendarSave.js"></script>
@endsection