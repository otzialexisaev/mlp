<?php

namespace App\_rpc\forms;

use App\Core\Forms;
use App;

class AddToPlaylistMenuModul extends Forms\Core
{
    static public $fields = ['songId' => 'required', 'playlistsIds' => 'required'];
    static public $model = 'PlaylistToSong';

    public function setSaveValues() //todo скомбинить saveValues из пришедших данных
    {
        
    }

    public function submit()
    {
//        parent::submit(); // TODO: Change the autogenerated stub
        echo 'submitted';
    }
}



