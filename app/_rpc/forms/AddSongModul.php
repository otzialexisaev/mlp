<?php

namespace App\_rpc\forms;

use App\Core\Forms;
use App;

class AddSongModul extends Forms\Core
{
    static public $fields = [ 'files' => 'required' ];
    static public $modelName = 'Songs';

    public function submit()
    {
        $this->setData();
        $fileDir = './storage/music/';
        var_dump($this->data['files']);
        die();
        $saveAs = $fileDir . basename($this->data['files']["name"]);
        if (move_uploaded_file($this->data['files']['tmp_name'], $saveAs)) {
            echo 'OK';
        } else {
            echo 'NOT OK';
        }

        $this->dataToSaveValues();
        $this->saveModelObjectFromSaveValues();
        // todo the rest
    }

    public function dataToSaveValues($multiValue = null, $useMultiValueKeyAs = false)
    {
        $fileDir = './storage/music/';
        $saveAs = $fileDir . basename($this->data['files']["name"]);
        //name	path	extension
        $this->saveValues[0]['name'] = pathinfo($this->data['files']['name'], PATHINFO_FILENAME);
        $this->saveValues[0]['path'] = $saveAs;
        $this->saveValues[0]['extension'] = pathinfo($this->data['files']['name'], PATHINFO_EXTENSION);
    }
}



