<?php
require_once './backend/core/api.php';
require_once './backend/api/api.php';
require_once './backend/database/connect.php';
require_once './backend/controller/language/language.php';

$request = new Request('GET', '/language');
error_log("....: " . print_r($request, true));
$api = new class(new DatabaseConnect()) {
    use ApiTrait;
};
  error_log("....: " . print_r($api->handleRequest($request), true));
$api->handleRequest($request);

?>