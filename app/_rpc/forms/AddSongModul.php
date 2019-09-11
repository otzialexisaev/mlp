<?php

namespace App\_rpc\forms;

use App\Core\Forms;
use App;

class AddSongModul extends Forms\Core
{
    static public $fields = ['files' => 'required'];
    static public $modelName = 'Songs';

    public function submit()
    {
        // todo проверку на пустые данные
        $this->setData();
        $fileDir = '/storage/music/';
        $size = sizeof($this->data['files']['name']);
        for ($i = 0; $i < $size; $i++) {
            $saveAs = $fileDir . basename($this->data['files']["name"][$i]);
            if (move_uploaded_file($this->data['files']['tmp_name'][$i], $saveAs)) {
                echo 'OK';
            } else {
                echo 'NOT OK';
            }
        }

        $this->dataToSaveValues();
        $this->saveModelObjectFromSaveValues();
    }

    public function dataToSaveValues($multiValue = null, $useMultiValueKeyAs = false)
    {
        $fileDir = '/storage/music/';
        $size = sizeof($this->data['files']['name']);
        for ($i = 0; $i < $size; $i++) {
            $saveAs = $fileDir . basename($this->data['files']["name"][$i]);
            $this->saveValues[] = [
                'name' => pathinfo($this->data['files']['name'][$i], PATHINFO_FILENAME),
                'path' => $saveAs,
                'extension' => pathinfo($this->data['files']['name'][$i], PATHINFO_EXTENSION),
            ];
        }
    }
}



