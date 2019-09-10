<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Songs extends Model
{
  protected $fillable = ['name', 'path'];
  protected $table = 'songs';
  public $timestamps = false;
}
