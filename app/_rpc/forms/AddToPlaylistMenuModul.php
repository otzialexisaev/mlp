<?php

namespace App\_rpc\forms;

use App\Core\Forms;
use App;

class AddToPlaylistMenuModul extends Forms\Core
{
    static public $fields = ['song_id' => 'required', 'playlistsIds' => 'required'];
    static public $modelName = 'PlaylistToSong';

    public function submit()
    {
        $this->setData();
        $this->dataToSaveValues(['toSave' => 'playlistsIds'], 'playlist_id');
        $this->saveModelObjectFromSaveValues();
    }

    public function saveModelObjectFromSaveValues()
    {
        foreach ($this->saveValues as $set) {
            var_dump($set);
            echo '<br>';
            if (isset($set['toSave']) && $set['toSave'] == 1) {
                unset($set['toSave']);

                $this->create($set);
            } else if (isset($set['toSave']) && $set['toSave'] == 0) {
                unset($set['toSave']);
                $this->delete(false, $set);
            } else {
                //todo error logging
            }
        }
    }
}



