<?php

namespace App\_rpc\forms;

use App\Core\Forms;
use App;

class SongMenuModul extends Forms\Core
{
    static public $fields = ['id' => 'selfcontained', 'name'=>'required'];
    static public $model = 'Song';

//    public function submit() {
//        $saveValues = [];
//        foreach (self::$fields as $field => $param) {
////            var_dump($field);
//            var_dump($this->data);
//            if ($param == 'selfcontained') {
//                if (isset($this->$field)) {
//                    $saveValues[] = ['key' => $this->$field, 'value' => $this->$field];
//                } else {
//                    //todo throw error
//                }
//                continue;
//            }
//            if (isset($this->data->$field)) { //todo проверку на обязательные поля
//                $saveValues[] = ['key' => $this->$field, 'value' => $this->data->$field];
//            }
//        }
//        print_r('saveValues:');
//        print_r($saveValues);
//        var_dump($this->data);
//    }
}



