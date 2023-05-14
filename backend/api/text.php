<?php
require_once './backend/core/api_test.php';
require_once './backend/database/connect.php';
require_once './backend/controller/language/language.php';
// require_once './backend/controller/resources/resource.php';

$dbConnect = new DatabaseConnect();
$router = new Router();
$languageController = new LanguageController($dbConnect);
$languages = $languageController->getAllLanguages();


$router->addRoute('GET', '/language', function($request) use ($languages) {
return new Response($languages);
}, $dbConnect);



try {
    // $response = $router->handle(new Request($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']));
    // echo $response->getBody();

    $response = $router->handle(new Request('GET', '/language'));
    echo $response->getBody();
} catch (ResourceNotFoundException $e) {
    echo '404 Not Found';
}

?>