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
    public $fields = ['id'];

    public function getFields()
    {
        var_dump($this->fields);
        var_dump('asd');
        return $this->fields;
    }
}