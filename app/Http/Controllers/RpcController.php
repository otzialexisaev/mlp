<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RpcController extends Controller
{
    public function formSubmit($form)
    {
        if (file_exists(app_path("_rpc/forms/{$form}.php"))) {
            $classname = '\\App\\_rpc\\forms\\'.$form;
            isset($_REQUEST['id'])
                ? $form = new $classname($_REQUEST['id'])
                : $form = new $classname();
            $fields = $form->submit();
            //todo response
            echo json_encode($fields);
        }
    }

    /**
     * Функция получения полей формы. Они должны быть указаны статических массивом в классе формы.
     * Класс должны называться так же как и класс соответствующей формы в js.
     *
     * @param $form
     */
    public function getFields($form)
    {
        if (file_exists(app_path("_rpc/forms/{$form}.php"))) {
//            include app_path("rpc/forms/{$form}.php");
//            $check = new Forms\Core();
//            $check = new forms\songmenumodul();
//            var_dump($check);
//            die();

//            $form = 'songmenumodul';
            $classname = '\\App\\_rpc\\forms\\'.$form;
//            $form = new $classname();
            $fields = $classname::getFields();
            //todo response
            echo json_encode($fields);
        }

    }

//    public function inputs($formtype) {
//        include app_path("/_rpc/inputs/{$formtype}");
//    }
}
