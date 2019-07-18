<?php

namespace App\Http\Controllers;

use App\Playlist;
use Illuminate\Http\Request;

class MenusController extends Controller
{
    static public function getSongMenu()
    {
        $playlists = Playlist::select('id', 'name')->orderBy('changed_at', 'desc')->take(3)->get();
//        var_dump($playlists);
        return json_encode($playlists);
    }
}
