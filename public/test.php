<?php
if (isset(getallheaders()['Origin']) && getallheaders()['Origin'] == 'http://localhost:8080') {
    header('Access-Control-Allow-Origin: *');
}

echo 123;
exit(200);