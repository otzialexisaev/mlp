<?php

namespace App\_rpc\forms;

use App\Core\Forms;
use App;

class AddToPlaylistMenuModul extends Forms\Core
{
    static public $fields = ['id' => 'selfcontained'];
    static public $model = 'PlaylistToSong';

    public function setSaveValues() //todo скомбинить saveValues из пришедших данных
    {
        
    }
}



