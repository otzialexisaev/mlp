<?php
/**
 * Created by PhpStorm.
 * User: Alex
 * Date: 10.10.2019
 * Time: 22:41
 */

namespace App\Http\Controllers;

use App\Core\Calendar\Calendar;
use App\Schedule;

class ScheduleController extends Controller
{
    public function create()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $date = $_POST['date'];
            $subject = $_POST['subject'];
            $visited = 0;
            if (isset($_POST['visited']) && $_POST['visited'] == 'on') {
                $visited = 1;
            }
            $obj = new Schedule;
            $obj->date = $date;
            $obj->subject = $subject;
            $obj->visited = $visited;
            $obj->save();
        }
        return view('schedule.create');

    }

    public function index()
    {
        $calendar = new Calendar();

        return view('schedule.index', ['content' => $calendar->show()]);
    }

    public function view($date)
    {
        $object = Schedule::where('date', '=', $date)->latest('id')->first();
        if ($object) {
            $object = $object->toArray();
        }
        return view('schedule.create', ['object' => $object]);
    }
}
