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
        $this->setData();
        $fileDir = base_path().'/public/storage/music/';
        $targetFile = $fileDir . basename($this->data['files']["name"]);
        if (move_uploaded_file($this->data['files']['tmp_name'], $targetFile)) {
            echo 'OK';
        } else {
            echo 'NOT OK';
        }
        // todo the rest
    }
}



