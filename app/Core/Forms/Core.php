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
        // получается объект, далее в dataToSaveValues преобразуется в массив
        $this->data = json_decode(stripslashes(file_get_contents("php://input")));
//        var_dump($this->data);
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
        if (!$multiValue) {
            foreach (static::$fields as $field => $param) {
                if (isset($this->data->$field)) { //todo проверку на обязательные поля
                    $this->saveValues[0][] = ['key' => $field, 'value' => $this->data->$field];
                }
            }
//            var_dump($this->saveValues);
        }
        else if (!is_array($multiValue) && isset($this->data->$multiValue)){
            if ($useMultiValueKeyAs) {
                foreach ($this->data->$multiValue as $key => $value) {
                    $size = sizeof($this->saveValues);
                    foreach (static::$fields as $field => $param) {
                        if ($field == $multiValue) {
                            $this->saveValues[$size][] = [
                                'key' => $multiValue,
                                'value' => $value,
                            ];
                            $this->saveValues[$size][] = [
                                'key' => $useMultiValueKeyAs,
                                'value' => $key,
                            ];
                        } else {
                            $this->saveValues[$size][] = [
                                'key' => $field,
                                'value' => $this->data->$field,
                            ];
                        }
                    }
                }
            } else {
                foreach ($this->data->$multiValue as $value) {
                    $size = sizeof($this->saveValues);
                    foreach (static::$fields as $field => $param) {
                        if ($field == $multiValue) {
                            $this->saveValues[$size][] = [
                                'key' => $multiValue,
                                'value' => $value,
                            ];
                        } else {
                            $this->saveValues[$size][] = [
                                'key' => $field,
                                'value' => $this->data->$field,
                            ];
                        }
                    }
                }
            }
        } else if (is_array($multiValue) && isset($this->data->{array_values($multiValue)[0]})) {
            if ($useMultiValueKeyAs) {
                foreach ($this->data->{array_values($multiValue)[0]} as $key => $value) {
                    $size = sizeof($this->saveValues);
                    foreach (static::$fields as $field => $param) {
                        if ($field == array_values($multiValue)[0]) {
                            $this->saveValues[$size][] = [
                                'key' => array_keys($multiValue)[0],
                                'value' => $value,
                            ];
                            $this->saveValues[$size][] = [
                                'key' => $useMultiValueKeyAs,
                                'value' => $key,
                            ];
                        } else {
                            $this->saveValues[$size][] = [
                                'key' => $field,
                                'value' => $this->data->$field,
                            ];
                        }
                    }
                }
            } else {
                foreach ($this->data->{array_values($multiValue)[0]} as $value) {
                    $size = sizeof($this->saveValues);
                    foreach (static::$fields as $field => $param) {
                        if ($field == array_values($multiValue)[0]) {
                            $this->saveValues[$size][] = [
                                'key' => array_keys($multiValue)[0],
                                'value' => $value,
                            ];
                        } else {
                            $this->saveValues[$size][] = [
                                'key' => $field,
                                'value' => $this->data->$field,
                            ];
                        }
                    }
                }
            }
        }
        echo "<pre>"; print_r($this->saveValues); echo "</pre>";
//        var_dump($this->saveValues);

    }

    /**
     * Преобразование полученных данных из реквеста в готовые к записи данные.
     */
    public function setSaveValues()
    {

    }

    /**
     * Получает id записи из полученных данных.
     */
    public function getIdFromSaveValues()
    {
        foreach ($this->saveValues as &$set) {
            foreach ($set as $setValue) {
                if ($setValue['key'] == 'id') {
                    $this->id = $setValue['value'];
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
            foreach ($set as $setValue) {
                $setValue['key'] = static::$modelMap[$setValue['key']];
            }
        }
    }

    /**
     * Запись данных в модель. Если задан id то происходит перезапись, без id - созданые новой записи.
     */
    public function saveModelObjectFromSaveValues()
    {
//        if ($this->id) {
//            $this->update();
//        }
//        $this->create();
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