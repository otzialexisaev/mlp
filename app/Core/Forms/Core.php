<?php
/**
 * Created by PhpStorm.
 * User: Alex
 * Date: 10.08.2019
 * Time: 1:24
 */

namespace App\Core\Forms;
use App;

class Core
{
    static public $fields = ['id' => 'nonrequried'];
    static public $model = null;

    public $id = null;
    public $data = null;

    public function __construct($id = null) {
        if ($id) {
            $this->id = $id;
        }
    }

    static public function getFields()
    {
        return static::$fields;
    }

    /**
     * @param $data string json object with values
     */
//    public function submit() {
////        header("Content-Type: application/json");
//// build a PHP variable from JSON sent using POST method
//
//        $this->data = json_decode(stripslashes(file_get_contents("php://input")));
//    }

    public function submit() {
        $this->data = json_decode(stripslashes(file_get_contents("php://input")));
//        $field = 'name';
//        var_dump($this->data->$field);
        $saveValues = [];
        foreach (static::$fields as $field => $param) {
//            var_dump($field);
//            var_dump($this->data);
//            print_r($field .'='. $param);
            if ($param == 'selfcontained') {
                if (isset($this->$field)) {
                    $saveValues[] = ['key' => $field, 'value' => $this->$field];
                } else {
                    //todo throw error
                }
                continue;
            }
//            print_r($this->data->$field);
            if (isset($this->data->$field)) { //todo проверку на обязательные поля
                $saveValues[] = ['key' => $field, 'value' => $this->data->$field];
            }
        }
        $objname = 'App\\'.static::$model;
        //todo update модель а не insert или проерку на $this->id
        $obj = $objname::find($this->id);
        foreach ($saveValues as $values) {
            $key = $values['key'];
            $obj->$key = $values['value'].'.mp3';
        }
        $obj->save();
    }

    public function setData($data) {
        $this->data = $data;
    }
}