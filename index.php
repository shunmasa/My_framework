<?php
require_once './backend/core/api_test.php';
require_once './backend/database/connect.php';

require_once './backend/api/teaching.php';
require_once './backend/api/news.php';
// declare(strict_types=1);

// spl_autoload_register(function ($class) {
//     require __DIR__ . "/dpm_0.1/$class.php";
// });

$parentDir = dirname(__DIR__);

function isRequestUriMatch($string) {
    return strpos($_SERVER['REQUEST_URI'], $string) !== false;
}

$uri = str_replace($parentDir, '', $_SERVER['REQUEST_URI']);

$slug = explode('/', $uri)[2]; 
// var_dump($uri);
$endpoint = explode('/', $uri)[3]; 
//  var_dump($endpoint);
$id = explode('/', $uri)[4]; 
//  var_dump($id);
$requestMethod = $_SERVER['REQUEST_METHOD']; 
$requestUri = '';
if (is_numeric($id) && $id !== '') {
    $requestUri = '/' . $slug . '/' . $endpoint . '/' . $id;
} else {
    $requestUri = '/' . $slug . '/' . $endpoint;
}

//  var_dump($requestUri);
switch (true) {
    case isRequestUriMatch('/teaching'):
        $teachingApi = new TeachingApi($requestMethod, $slug, '/' . $endpoint, $id);
    
        $request = new Request($requestMethod, $requestUri);
      
        try {
            $response = $teachingApi->handleRequest($request);
            $response->send();
        } catch (ResourceNotFoundException $e) {
            http_response_code(404);
        }
        break;
        case isRequestUriMatch('/news'):
            $teachingApi = new NewsApi($requestMethod, $slug, '/' . $endpoint, $id);
            $request = new Request($requestMethod, $requestUri);
        try {
            $response = $teachingApi->handleRequest($request);
            $response->send();
        } catch (ResourceNotFoundException $e) {
            http_response_code(404);
        }
        break;
    default:
        echo 'Not Found';
}
?>