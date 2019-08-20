<?php
/**
 * Created by PhpStorm.
 * User: Alex
 * Date: 16.08.2019
 * Time: 23:04
 */

$playlists = App\Playlist::all();
echo "<div id='playlist-multiple-select-container'>";
foreach ($playlists as $playlist) {
    echo "<div class='menucore-select-singletable'>";
    echo "<div class='menucore-select-singletablecell'>{$playlist->name}</div>";
//    var_dump($playlist->name);
    echo "</div>";
}
echo "</div>";
//var_dump($playlists);