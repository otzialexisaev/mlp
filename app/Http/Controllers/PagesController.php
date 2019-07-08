<?php

namespace App\Http\Controllers;

use App\Song;
use Illuminate\Http\Request;

class PagesController extends Controller
{
  public function songs()
  {
    $songs = Song::all();
    return view('songs', ['songs' => $songs]);
  }

  public function index()
  {
    return view('index');
  }
}
