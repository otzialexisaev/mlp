<?php

namespace App\Http\Controllers;

//use Forms;
use App\_rpc\forms;
//use App\Core\Forms;

class FormController extends Controller
{
    public function formSubmit($form)
    {
        if (file_exists(app_path("_rpc/forms/{$form}.php"))) {
            include app_path("_rpc/forms/{$form}.php");
        }
    }

    public function getFields($form)
    {
        if (file_exists(app_path("_rpc/forms/{$form}.php"))) {
//            include app_path("rpc/forms/{$form}.php");
//            $check = new Forms\Core();
//            $check = new forms\songmenumodul();
//            var_dump($check);
//            die();

            $form = 'songmenumodul';
            $classname = '\\App\\_rpc\\forms\\'.$form;
            $form = new $classname();
            $fields = $form->getFields();
            //todo response
            echo json_encode($fields);
        }

    }
}
