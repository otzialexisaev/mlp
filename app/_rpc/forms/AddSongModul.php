<?php

namespace App\_rpc\forms;

use App\Core\Forms;
use App;

class AddSongModul extends Forms\Core
{
    static public $fields = [ 'files' => 'required' ];
    static public $modelName = 'PlaylistToSong';

    public function submit()
    {
        var_dump($_FILES);
//        $this->setData();
//        $this->dataToSaveValues(['toSave' => 'playlistsIds'], 'playlist_id');
//        $this->saveModelObjectFromSaveValues();
    }

    public function setData()
    {

    }
}



