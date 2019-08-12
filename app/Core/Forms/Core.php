<?php
/**
 * Created by PhpStorm.
 * User: Alex
 * Date: 10.08.2019
 * Time: 1:24
 */

namespace App\Core\Forms;

class Core
{
    static public $fields = ['id' => 'nonrequried'];

    static public function getFields()
    {
        return static::$fields;
    }

    static public function submit() {
//        echo $_REQUEST['']
        var_dump($_REQUEST);
    }
}