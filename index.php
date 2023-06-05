<?php

require_once './backend/core/api_caches.php';
require_once './backend/core/rateLimite.php';
require_once './backend/database/connect.php';
require_once './backend/core/auth.php';
require_once './backend/api/teaching.php';
require_once './backend/api/news.php';
require_once './backend/api/users.php';
require_once './backend/api/create.php';
require_once './backend/api/token.php';
require_once './backend/api/register.php';
require_once './apiHandler.php';
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


$apiRoutes = [
    '/teaching' => ['class' => TeachingApi::class, 'auth' => false],
    '/news' => ['class' => NewsApi::class, 'auth' => false],
    '/getToken' => ['class' => TokenApi::class, 'auth' => false],
    '/register' => ['class' => RegisterApi::class, 'auth' => false],
    '/user' => ['class' => UsersApi::class, 'auth' => true],
    '/collections' => ['class' => CreateApi::class, 'auth' => true]
];


function startsWith(string $string, string $substring): bool {
    return substr($string, 0, strlen($substring)) === $substring;
}

foreach ($apiRoutes as $route => $api) {
    if (isRequestUriMatch($route)) {
        if ($api['auth']) {
            ApiHandler::authHandleApiRequest($api['class'], $requestMethod, $requestUri);
        } else {
            ApiHandler::handleApiRequest($api['class'], $requestMethod, $requestUri);
        }
        exit;
    }
}

echo 'Not Found';





// $apiRoutes = [
//     '/teaching' => ['class' => TeachingApi::class, 'auth' => true, 'not_auth' => ['GET']],// GET deoes not need auth , but else needs auth
//     '/news' => ['class' => NewsApi::class, 'auth' => true, 'not_auth' => ['GET']],// GET deoes not need auth , but else needs auth
//     '/setToken' => ['class' => TokenApi::class, 'auth' => false, 'not_auth' => []],// not auth
//     '/register' => ['class' => RegisterApi::class, 'auth' => false, 'not_auth' => []],//not auth 
//     '/user' => ['class' => UsersApi::class, 'auth' => true, 'not_auth' => []],//auth 
//     '/collections' =>['class' => UsersApi::class, 'auth' => true, 'not_auth' => []]
// ];

// $authNotRequiredClasses = [TeachingApi::class, NewsApi::class, TokenApi::class];

// foreach ($apiRoutes as $route => $api) {
//     if (isRequestUriMatch($route)) {
//         $isAuthRoute = $api['auth'] && $route !== '/user';
//         $isNotAuthMethod = $requestMethod === 'GET' && !in_array($requestMethod, $api['not_auth']);

//         if ($isAuthRoute && $isNotAuthMethod && !in_array($api['class'], $authNotRequiredClasses)) {
//             ApiHandler::authHandleApiRequest($api['class'], $requestMethod, $requestUri);
//         } else {
//             ApiHandler::handleApiRequest($api['class'], $requestMethod, $requestUri);
//         }

//         exit;
//     }
// }

// echo 'Not Found';









// switch (true) {
//     case isRequestUriMatch('/teaching'):
//         if($requestMethod == "GET"){
//         handleApiRequest(TokenApi::class, $requestMethod, $requestUri);
//         }else{
//         authHandleApiRequest(TeachingApi::class, $requestMethod,$requestUri); 
//         }
          
//         break;
//         case isRequestUriMatch('/news'):
//             if($requestMethod == "GET"){
//                 handleApiRequest(TokenApi::class, $requestMethod, $requestUri);
//                 }else{
//                 authHandleApiRequest(TeachingApi::class, $requestMethod,$requestUri); 
//                 }
//         break;
//        case isRequestUriMatch('/setToken'):
//          handleApiRequest(TokenApi::class, $requestMethod, $requestUri);
//         break;
//         case isRequestUriMatch('/register'):
//         authHandleApiRequest(RegisterApi::class, $requestMethod, $requestUri);
//         break;
//         case isRequestUriMatch('/user'):
//         authHandleApiRequest(UsersApi::class, $requestMethod, $requestUri);
//         break;
//     default:
//         echo 'Not Found';
// }





// 
 ?>