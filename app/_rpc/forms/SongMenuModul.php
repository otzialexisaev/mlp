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

}



