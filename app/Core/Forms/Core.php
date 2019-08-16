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
    public $saveValues = [];

    public function __construct($id = null)
    {
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

    public function submit()
    {
        $this->setData();
        $this->setSaveValues();
        $this->saveModelObjectFromSaveValues();
    }

    public function setData()
    {
        $this->data = json_decode(stripslashes(file_get_contents("php://input")));
    }

    public function setSaveValues()
    {
        $this->dataToSaveValues();
    }

    public function dataToSaveValues()
    {
        foreach (static::$fields as $field => $param) {
            if ($param == 'selfcontained') {
                if (isset($this->$field)) {
                    $this->saveValues[] = ['key' => $field, 'value' => $this->$field];
                } else {
                    //todo throw error
                }
                continue;
            }
//            print_r($this->data->$field);
            if (isset($this->data->$field)) { //todo проверку на обязательные поля
                $this->saveValues[] = ['key' => $field, 'value' => $this->data->$field];
            }
        }
    }

    public function saveModelObjectFromSaveValues()
    {
        $objname = 'App\\' . static::$model;
        //todo update модель а не insert или проерку на $this->id
        $obj = $objname::find($this->id);
        foreach ($this->saveValues as $values) {
            $key = $values['key'];
            $obj->$key = $values['value'] . '.mp3';
        }
        $obj->save();
    }
}