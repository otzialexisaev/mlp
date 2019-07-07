<?php

namespace App\Http\Controllers;

use App\Song;
use Illuminate\Http\Request;

class PagesController extends Controller
{
  public function songs()
  {
    $song = Song::find(1)->first();
    return view('songs', ['song' => $song]);
  }

  public function index()
  {
    return view('index');
  }
}
