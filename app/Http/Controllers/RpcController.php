<?php

namespace App\Http\Controllers;

class RpcController extends Controller
{
    public function test()
    {
        require_once $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR . "test.php";
    }

    public function formSubmit($form)
    {
        if (file_exists(app_path("_rpc/forms/{$form}.php"))) {
            $classname = '\\App\\_rpc\\forms\\' . $form;
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
            $classname = '\\App\\_rpc\\forms\\' . $form;
            $fields = $classname::getFields();
            //todo response
            echo json_encode($fields);
        }
    }

    public function getModelMap($form)
    {
        if (file_exists(app_path("_rpc/forms/{$form}.php"))) {
            $classname = '\\App\\_rpc\\forms\\' . $form;
            $modelMap = $classname::getModelMap();
            //todo response
            echo json_encode($modelMap);
        }
    }

    public function delete($form)
    {
        $id = $_GET['id'];
        if (file_exists(app_path("_rpc/forms/{$form}.php"))) {
            $classname = '\\App\\_rpc\\forms\\' . $form;
//            $form = new $classname();
            $classname::delete($id);
        }
    }
}