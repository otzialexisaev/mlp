<?php

namespace App\_rpc\forms;

use App\Core\Forms;
use App;

class PlaylistSettingsModul extends Forms\Core
{
    static public $fields = ['newPlaylistName' => 'required'];
    static public $modelName = 'Playlist';

    static public $modelMap = [
        'newPlaylistName' => 'name'
    ];

}