<?php

require_once './backend/core/api_caches.php';
require_once './backend/core/rateLimite.php';
require_once './backend/database/connect.php';
require_once './backend/core/auth.php';
require_once './backend/api/teaching.php';
require_once './backend/api/news.php';
require_once './backend/api/users.php';
require_once './backend/api/token.php';
require_once './backend/api/register.php';
require 'vendor/autoload.php';


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



function handleApiRequest($apiClass, $requestMethod, $requestUri )
{
    $api = new $apiClass($requestMethod, $requestUri );
    $request = new Request($requestMethod,$requestUri);
    $response = $api->handleRequest($request);
    $response->send();
}

function authHandleApiRequest($apiClass, $requestMethod, $requestUri)
{
    $authentication = new AuthenticationRequest();

    if (!$authentication->verifyToken()) {
        $response = new Response([], 401);
        $response->setMessage('Unauthorized');
        $response->send();
        return;
    }
 
    $api = new $apiClass($requestMethod, $requestUri);
    $request = new Request($requestMethod, $requestUri);
    $rateLimiter = new RateLimiter(10, 60); 
    $rateLimiter->makeRequest($request->getUri());
    $response = $api->handleRequest($request);
    $response->send();
}






switch (true) {
    case isRequestUriMatch('/teaching'):
        authHandleApiRequest(TeachingApi::class, $requestMethod,$requestUri);   
        break;
        case isRequestUriMatch('/news'):
        authHandleApiRequest(NewsApi::class, $requestMethod, $requestUri);
        break;
       case isRequestUriMatch('/setToken'):
         handleApiRequest(TokenApi::class, $requestMethod, $requestUri);
        break;
        case isRequestUriMatch('/register'):
        authHandleApiRequest(RegisterApi::class, $requestMethod, $requestUri);
        break;
        case isRequestUriMatch('/users'):
        authHandleApiRequest(UsersApi::class, $requestMethod, $requestUri);
        break;
    default:
        echo 'Not Found';
}





// 
 ?>