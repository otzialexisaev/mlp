<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
  protected $fillable = ['name', 'path'];
  protected $table = 'song';

  static public function displaySongs()
  {
    $songs = Song::all();
    echo "<div class='ostContainer'>";
    foreach ($songs as $song) {
      $song->displayOne();
    }
    echo "<div>";
    return $songs;
  }

  public function displayOne()
  {
    $songname = substr($this->name, 0, -4);
    echo "<div class='songContainer noselect' 
            data-audio='$this->path$this->name' 
            data-songid='$this->id'
            data-songname='$songname'>$songname</div>";
  }
}
