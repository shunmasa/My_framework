<?php
require_once './backend/core/api.php';
require_once './backend/api/api.php';
require_once './backend/database/connect.php';
require_once './backend/controller/resources/resource.php';

$request = new Request('GET', '/resources');
$api = new class(new DatabaseConnect()) {
    use ApiTrait;
};

$api->handleRequest($request);


?>