<?php
require_once './backend/core/api_test.php';
require_once './backend/database/connect.php';
require_once './backend/database/index.php';
require_once './backend/controller/language/language.php';
// require_once './backend/controller/resources/resource.php';

// declare(strict_types=1);


spl_autoload_register(function ($class) {
    require __DIR__ . "/dpm_0.1/$class.php";
});



if ($_SERVER['REQUEST_URI'] === '/language') {
$dbConnect = new DatabaseConnect();
$router = new Router();
$languageController = new LanguageController($dbConnect);
$languages = $languageController->getAllLanguages();


$router->addRoute('GET', '/language', function($request) use ($languages) {
return new Response($languages);
}, $dbConnect);



try {
 

    $response = $router->handle(new Request('GET', '/language'));

    $response->send();
} catch (ResourceNotFoundException $e) {
    http_response_code(404);
}


} 
else{
    echo 'Not Found';
}
?>