<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
  protected $table = 'playlists';
  public $timestamps = false;

  static public function displayPlaylists()
  {
    $playlists = Playlist::all();
    echo "<div class='ost-container'>";
    foreach ($playlists as $playlist) {
      $playlist->displayOne();
    }
    echo "<div>";
    return $playlists;
  }

  public function displayOne()
  {
    $url = url("/playlists/{$this->id}");
    echo "<a class='playlistIcon' href='$url'>".$this->name."</a>";
  }
}
