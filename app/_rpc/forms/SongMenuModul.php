<?php

namespace App\_rpc\forms;

use App\Core\Forms;
use App;

class SongMenuModul extends Forms\Core
{
    static public $fields = ['songId' => 'required', 'songName'=>'required'];
    static public $modelName = 'Songs';
    static public $modelMap = [
        'songId' => 'id',
        'songName' => 'name',
    ];

    static public function deleteId($id)
    {
        $model = 'App\\' . static::$modelName;
        $obj = $model::find($id);
        unlink(substr($obj->path,1));
        $obj->delete();
    }
}



