<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FormController extends Controller
{
    public function formSubmit($form)
    {
        var_dump($form);
    }
}
