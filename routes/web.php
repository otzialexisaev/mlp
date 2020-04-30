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
Route::get('/api/test', 'RpcController@test');
Route::post('/_rpc/forms/{form}/submit', 'RpcController@formSubmit');
Route::get('/_rpc/forms/{form}/getfields', 'RpcController@getFields');
Route::get('/_rpc/forms/{form}/getModelMap', 'RpcController@getModelMap');
Route::get('/_rpc/forms/{form}/delete', 'RpcController@delete');
Route::get('/_rpc/playlists/getPlaylists', 'PlaylistsController@getPlaylists');
Route::get('/schedule', 'ScheduleController@index');
Route::get('/schedule/create', 'ScheduleController@create');
Route::post('/schedule/create', 'ScheduleController@create');
Route::get('/schedule/{date}', 'ScheduleController@view');
Route::get('/api/songs', 'SongsController@apiAllSongs');