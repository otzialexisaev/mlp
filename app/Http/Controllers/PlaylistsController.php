<?php

namespace App\Http\Controllers;

use App\Playlist;
use App\PlaylistToSong;
use App\Song;
use Illuminate\Http\Request;

class PlaylistsController extends Controller
{
    /**
     * Возвращает все плэйлисты в формате json массивом объектов. Если передан songId - возвращает
     * ..............................................................
     *
     * @param null $songId
     */
    public function getPlaylists()
    {
        $playlists = Playlist::all();
        $songId = isset($_REQUEST['songId']) ? $_REQUEST['songId'] : false;
//        var_dump($playlists);
        if (!$songId) {
            echo json_encode($playlists);
            return;
        }
        $relations = PlaylistToSong::where('song_id', '=', $songId)->get()->toArray();
        $tempRel = [];
        foreach ($relations as $rel) {
            array_push($tempRel, $rel['playlist_id']);
        }
        $relations = $tempRel;
//        var_dump($relations);
        $playlistsWithValues = [];
        foreach ($playlists as $playlist) {
            $playlistsWithValues[$playlist->id] = [
                'id' => $playlist->id,
                'name' => $playlist->name,
                'value' => 0, //this value is to be checked and changed below if needed
            ];
            if (in_array($playlist->id, $relations)) {
                $playlistsWithValues[$playlist->id]['value'] = 1;
            }
        }
//        var_dump($playlistsWithValues);
        echo json_encode(array_values($playlistsWithValues));

//        echo json_encode($playlists);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $playlists = Playlist::all();
        return view('playlists.index', ['playlists' => $playlists]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //todo
        $relations = PlaylistToSong::where('playlist_id', $id)->pluck('song_id')->toArray();
        $songs = Song::whereIn('id', $relations)->get();
        return view('playlists.view', ['songs' => $songs, 'rels' => $relations]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
