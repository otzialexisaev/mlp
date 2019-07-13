<?php

namespace App\Http\Controllers;

use App\Playlist;
use App\Song;
use Illuminate\Http\Request;

class PagesController extends Controller
{
  public function playlists()
  {
    $playlists = Playlist::all();
    return view('playlists', ['playlists' => $playlists]);
  }

  public function index()
  {
    return view('index');
  }
}
