<?php
require_once './backend/core/api_caches.php';
require_once './backend/database/connect.php';
require_once './backend/api/teaching.php';
require_once './backend/api/news.php';
require_once './backend/api/users.php';

require 'vendor/autoload.php';


// declare(strict_types=1);

// spl_autoload_register(function ($class) {
//     require __DIR__ . "/dpm_0.1/$class.php";
// });




function isRequestUriMatch($string) {
    return strpos($_SERVER['REQUEST_URI'], $string) !== false;
}



$parentDir = dirname(__DIR__);
$uri = str_replace($parentDir, '', $_SERVER['REQUEST_URI']);
$prefix = '/dpm_0.1';
if (strpos($uri, $prefix) === 0) {
    $requestUri = substr($uri, strlen($prefix));
}

$requestMethod = $_SERVER['REQUEST_METHOD'];

var_dump($requestUri);
function handleApiRequest($apiClass, $requestMethod, $requestUri )
{
    $api = new $apiClass($requestMethod, $requestUri );
    $request = new Request($requestMethod,$requestUri);
    $response = $api->handleRequest($request);
    $response->send();
}




switch (true) {
    case isRequestUriMatch('/teaching'):
    
        handleApiRequest(TeachingApi::class, $requestMethod,$requestUri);   
        break;
        case isRequestUriMatch('/news'):
            // handleApiRequest(NewsApi::class, $requestMethod, $requestUri,$slug, $endpoint, $id);
            break;
       case isRequestUriMatch('/login'):
             handleApiRequest(UsersApi::class, $requestMethod, $requestUri);
        break;
        case isRequestUriMatch('/logout'):
            // handleApiRequest(UsersApi::class, $requestMethod, $requestUri,$slug, $endpoint, $id);
            break;
        case isRequestUriMatch('/register'):
            // handleApiRequest(UsersApi::class, $requestMethod, $requestUri,$slug, $endpoint, $id);
            break;
        case isRequestUriMatch('/users'):
            // handleApiRequest(UsersApi::class, $requestMethod, $requestUri,$slug, $endpoint, $id);
            break;
    default:
        echo 'Not Found';
}





// 
 ?>