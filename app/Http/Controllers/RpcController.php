<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RpcController extends Controller
{
    public function inputs($formtype) {
        include app_path("/_rpc/inputs/{$formtype}");
    }
}
