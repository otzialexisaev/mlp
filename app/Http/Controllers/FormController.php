<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FormController extends Controller
{
    public function formSubmit($form)
    {
        include app_path("_rpc/forms/{$form}.php");
    }
}
