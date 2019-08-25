<?php
/**
 * Created by PhpStorm.
 * User: Alex
 * Date: 10.08.2019
 * Time: 1:24
 */

namespace App\Core\Forms;

use App;

class Core
{
    static public $fields = ['id' => 'nonrequried'];
    static public $model = null;
    static public $modelMap = [];
    public $id = null;
    public $data = null;
    public $saveValues = [];

    //todo id может быть задан из данных либо при создании, реализовать только один способ
    /**
     * Core constructor.
     * Id может быть передан из js или взят из пришедших данных
     * @param null $id
     */
    public function __construct($id = null)
    {
        if ($id) {
            $this->id = $id;
        }
    }

    static public function getFields()
    {
        return static::$fields;
    }

    public function submit()
    {
        $this->setData();
        $this->setSaveValues();
        $this->saveModelObjectFromSaveValues();
    }

    /**
     * Получение данных из реквеста.
     */
    public function setData()
    {
        // получается объект, далее в dataToSaveValues преобразуется в массив
        $this->data = json_decode(stripslashes(file_get_contents("php://input")));
    }

    /**
     * Преобразование полученных данных из реквеста в готовые к записи данные.
     */
    public function setSaveValues()
    {
        $this->dataToSaveValues();
        $this->mapDataToModel();
        $this->getIdFromData();
    }

    /**
     * Получает id записи из полученных данных.
     */
    public function getIdFromData()
    {
        foreach ($this->saveValues as $value) {
            if ($value['key'] == 'id') {
                $this->id = $value['value'];
                break;
            }
        }
    }

    /**
     * Смена ключей данных для сохранения на те что в модели.
     */
    public function mapDataToModel()
    {
        foreach ($this->saveValues as &$set) {
            $set['key'] = static::$modelMap[$set['key']];
        }
    }

    /**
     * Преобразует полученные данные из объекта в массив по типу
     * [
     *  'key' => название_ключа,
     *  'value' => значение,
     * ]
     */
    public function dataToSaveValues()
    {
        foreach (static::$fields as $field => $param) {
            if (isset($this->data->$field)) { //todo проверку на обязательные поля
                $this->saveValues[] = ['key' => $field, 'value' => $this->data->$field];
            }
        }
    }

    /**
     * Запись данных в модель. Если задан id то происходит перезапись, без id - созданые новой записи.
     */
    public function saveModelObjectFromSaveValues()
    {
        if ($this->id) {
            $this->update();
        }
        $this->create();
    }

    public function create()
    {
        //todo
    }

    public function update()
    {
        $objname = 'App\\' . static::$model;
        $obj = $objname::find($this->id);
        foreach ($this->saveValues as $values) {
            $key = $values['key'];
            $obj->$key = $values['value'] . '.mp3';
        }
        $obj->save();
    }
}