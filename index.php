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
require_once './ssg.php';
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

// echo 'Not Found';



////////////////////////////////////////////////////////////////
////////////SSR/////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//how to set lamguage in routes?
$routes = [
    'tletter' => 'tletter',
    'detail_teaching' => 'detail_teaching',
    'news' => 'news'
 
    // 'about' => 'about',
    // 'contact' => 'contact',
];

$apiEndpoints = [
     'home' => 'http://localhost:8080/dpm_0.1/teaching',
    '{language}/tletter' => 'http://localhost:8080/dpm_0.1/{language}/teaching',
    '{language}/detail_teaching' => 'http://localhost:8080/dpm_0.1/{language}/teaching',
];

$templatePath = '';

$requestUri = $_SERVER['REQUEST_URI'];

$route = trim(parse_url($requestUri, PHP_URL_PATH), '/');
$route = preg_replace('/^dpm_0\.1\//', '', $route);

$routeParts = explode('/', $route);
// $route = end($routeParts);
// $language = $routeParts[0];

$ssr = new SSG($apiEndpoints, $templatePath);

$ssr->setLanguage($routeParts[0]);

$ssr->replaceLanguagePlaceholder($routeParts[0]); 




switch ($routeParts[1]) {
   
    case 'tletter':
        $ssr->setTemplatePath('teaching.html');
         break;
         case 'detail_teaching':
            $ssr->setTemplatePath('detail_teaching.html');
            break;
    case 'css':
            $cssFileName = end($routeParts);
            header('Content-Type: text/css');
            $ssr->setTemplatePath('css/'. $cssFileName);
      
        break;
    case 'js':
        header('Content-Type: application/javascript');
            $jsFileName = end($routeParts);
            $ssr->setTemplatePath('js/' .$jsFileName);
        break;
   
        case 'images':
            $fileName = end($routeParts);
            if (strpos($fileName, '.webp') !== false) {
                header('Content-Type: image/webp');
                $ssr->setTemplatePath('images/' . $fileName);
            } elseif (strpos($fileName, '.svg') !== false) {
                header('Content-Type: image/svg+xml');
                $ssr->setTemplatePath('images/' . $fileName);
            } elseif (strpos($fileName, '.png') !== false) {
                header('Content-Type: image/png');
                $ssr->setTemplatePath('images/' . $fileName);
            } else {
                
            }
            break;
 
          case 'fonts':
            $fontsName = end($routeParts);
            header('Content-Type: font/woff');
          $ssr->setTemplatePath('fonts/' . $fontsName);

           default:
      
      
        break;
}


$ssr->render($route);

 
 ?>