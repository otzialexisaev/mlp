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
    static public $modelName = null;
    static public $modelMap = [];
    public $id = null;
    public $data = null;
    public $saveValues = [];
    public $model = null;

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
        $this->model = 'App\\' . static::$modelName;
    }

    static public function getFields()
    {
        return static::$fields;
    }

    static public function getModelMap()
    {
        return static::$modelMap;
    }

    public function submit()
    {
        $this->setData();
        $this->dataToSaveValues();
        $this->mapDataToModel();
        // если в модели нужен конкретный id
        if (in_array('id', array_values(static::$modelMap))) {
            $this->getIdFromSaveValues();
        }
        $this->saveModelObjectFromSaveValues();
    }

    /**
     * Получение данных из реквеста.
     */
    public function setData()
    {
        //todo я теперь посылаю форму а не json надо исправить
        $this->data = array_merge($_POST, $_FILES);
    }

    /**
     * Преобразует полученные данные из объекта в массив по типу
     * [
     *  'key' => название_ключа,
     *  'value' => значение,
     * ]
     * Если нужно создать/обновить несколько объектов модели по какому то пришедшему полю,
     * то нужно указать это поле в $multiValue.
     * Если нужно так же сохранить в saveValues ключ этого поля,
     * то нужно задать как он будет называться в $useMultiValueKeyAs.
     *
     * @param null $multiValue
     * @param bool $useMultiValueKeyAs
     */
    //todo сделать возможность передть массивом алиас для $multiValue
    public function dataToSaveValues($multiValue = null, $useMultiValueKeyAs = false)
    {
        //todo так как я теперь послыаю форму то данные приходят архивом а не объектом, исправить
        // вроде исправил но оставлю пока мало ли
        if (!$multiValue) {
            foreach (static::$fields as $field => $param) {
                if (isset($this->data[$field])) { //todo проверку на обязательные поля
                    $this->saveValues[0][$field] = $this->data[$field];
                }
            }
        } else if (!is_array($multiValue) && isset($this->data[$multiValue])) {
            if ($useMultiValueKeyAs) {
                foreach ($this->data[$multiValue] as $key => $value) {
                    $size = sizeof($this->saveValues);
                    foreach (static::$fields as $field => $param) {
                        if ($field == $multiValue) {
                            $this->saveValues[$size][$multiValue] = $value;
                            $this->saveValues[$size][$useMultiValueKeyAs] = $key;
                        } else {
                            $this->saveValues[$size][$field] = $this->data[$field];
                        }
                    }
                }
            } else {
                foreach ($this->data[$multiValue] as $value) {
                    $size = sizeof($this->saveValues);
                    foreach (static::$fields as $field => $param) {
                        if ($field == $multiValue) {
                            $this->saveValues[$size][$multiValue] = $value;
                        } else {
                            $this->saveValues[$size][$field] = $this->data[$field];
                        }
                    }
                }
            }
        } else if (is_array($multiValue) && isset($this->data[array_values($multiValue)[0]])) {
            if ($useMultiValueKeyAs) {
                $multiVal = array_values($multiValue)[0];
                //todo убрать json из джски и
                foreach (json_decode($this->data[$multiVal]) as $key => $value) {
                    $size = sizeof($this->saveValues);
                    foreach (static::$fields as $field => $param) {
                        if ($field == array_values($multiValue)[0]) {
                            $this->saveValues[$size][array_keys($multiValue)[0]] = $value;
                            $this->saveValues[$size][$useMultiValueKeyAs] = $key;
                        } else {
                            $this->saveValues[$size][$field] = $this->data[$field];
                        }
                    }
                }
            } else {
                foreach ($this->data[array_values($multiValue)[0]] as $value) {
                    $size = sizeof($this->saveValues);
                    foreach (static::$fields as $field => $param) {
                        if ($field == array_values($multiValue)[0]) {
                            $this->saveValues[$size][array_keys($multiValue)[0]] = $value;
                        } else {
                            $this->saveValues[$size][$field] = $this->data[$field];
                        }
                    }
                }
            }
        }
    }

    /**
     * Получает id записи из полученных данных.
     */
    public function getIdFromSaveValues()
    {
//        var_dump($this->saveValues);
        foreach ($this->saveValues as &$set) {
            foreach ($set as $key => $setValue) {
                var_dump($key);
                if ($key == 'id') {
                    var_dump('asd');
                    $this->id = $setValue;
                    break;
                }
            }
        }
    }

    /**
     * Смена ключей данных для сохранения на те что в модели.
     */
    public function mapDataToModel()
    {
        foreach ($this->saveValues as &$set) {
            foreach (static::$modelMap as $modelKey => $modelNewKey) {
                if (isset($set[$modelKey])) {
                    $set[$modelNewKey] = $set[$modelKey];
                    unset($set[$modelKey]);
                }
            }
        }
    }

    /**
     * Запись данных в модель. Если задан id то происходит перезапись, без id - созданые новой записи.
     */
    public function saveModelObjectFromSaveValues()
    {
        foreach ($this->saveValues as $set) {
            if ($this->id) {
                $this->update($set);
            }
            $this->create($set);
        }
    }

    /**
     * Удаление объекта
     *
     * @param bool $id
     * @param bool $set //todo or not
     */
    static public function delete($id = false, $set = false)
    {
        if ($id) {
            static::deleteId($id);
        } else if ($set) {
            $where = [];
            foreach ($set as $key => $field) {
                array_push($where, [$key, '=', $field]);
            }
            $model = 'App\\' . static::$modelName;
            $obj = new $model();
            $obj = $obj::where($where)->first();
            if (!empty($obj)) {
                $obj->delete();
            }
        }

    }

    /**
     * Удаление элемента по id
     *
     * @param $id
     */
    static public function deleteId($id)
    {
        $model = 'App\\' . static::$modelName;
        $obj = $model::find($id);
        $obj->delete();
    }

    //TODO check if object exists

    public function create($set)
    {
        //todo
        $path = 'App\\' . static::$modelName;
        $obj = new $path();
        $where = [];
        foreach ($set as $key => $field) {
            array_push($where, [$key, '=', $field]);
        }
        $check = $obj::where($where)->first();
        if ($check) {
            return;
        }
        foreach ($set as $field => $value) {
            $obj->$field = $value;
        }
        $obj->save();
    }

    public function update($set)
    {
        $obj = $this->model::find($this->id);
        foreach ($set as $key => $value) {
            $obj->$key = $value;
        }
        $obj->save();
    }
}