<?php

namespace App\_rpc\forms;

use App\Core\Forms;
use App;

class SongMenuModul extends Forms\Core
{
    //todo смена имени песни ломает все потому что путь к ней прописан не полный, а только до папки так что песню
    //по имени больше не находит

    static public $fields = ['songId' => 'required', 'songName'=>'required'];
    static public $model = 'Song';

    static public $modelMap = [
        'songId' => 'id',
        'songName' => 'name',
    ];
}



