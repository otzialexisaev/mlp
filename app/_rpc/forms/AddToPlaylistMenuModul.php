<?php

namespace App\_rpc\forms;

use App\Core\Forms;
use App;

class AddToPlaylistMenuModul extends Forms\Core
{
    static public $fields = ['songId' => 'required', 'playlistsIds' => 'required'];
    static public $model = 'PlaylistToSong';

//    public function setSaveValues() //todo скомбинить saveValues из пришедших данных
//    {
//
//    }

    public function submit()
    {
        $this->setData();
        $this->dataToSaveValues(['toSave' => 'playlistsIds'], 'playlistId');
//        $this->setSaveValues();
//        var_dump($this->saveValues);
//        $this->saveModelObjectFromSaveValues();
    }

    /*
     * Сейчас данные приходят так, думаю можно как то проверить toSave и дальше что то с этим делать
     *
     * Array
(
    [0] => Array
        (
            [0] => Array
                (
                    [key] => songId
                    [value] => 2
                )

            [1] => Array
                (
                    [key] => toSave
                    [value] => 1
                )

            [2] => Array
                (
                    [key] => playlistId
                    [value] => 1
                )

        )

    [1] => Array
        (
            [0] => Array
                (
                    [key] => songId
                    [value] => 2
                )

            [1] => Array
                (
                    [key] => toSave
                    [value] => 1
                )

            [2] => Array
                (
                    [key] => playlistId
                    [value] => 2
                )

        )

    [2] => Array
        (
            [0] => Array
                (
                    [key] => songId
                    [value] => 2
                )

            [1] => Array
                (
                    [key] => toSave
                    [value] => 0
                )

            [2] => Array
                (
                    [key] => playlistId
                    [value] => 3
                )

        )
)
     */

    public function dataToSaveValues($multiValue = null, $useMultiValueKeyAs = false) {
        parent::dataToSaveValues($multiValue, $useMultiValueKeyAs);
    }
}



