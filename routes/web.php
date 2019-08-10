<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});

Route::get('/', 'PagesController@index');

Route::get('/songs', 'SongsController@index');
Route::get('/playlists', 'PlaylistsController@index');
Route::get('/playlists/{id}', 'PlaylistsController@show');
Route::get('songMenu', 'MenusController@getSongMenu');
Route::get('/_rpc/inputs/{formtype}', 'RpcController@inputs');
Route::get('/_rpc/forms/{form}/submit', 'FormController@formSubmit');
Route::get('/_rpc/forms/{form}/getfields', 'FormController@getFields');