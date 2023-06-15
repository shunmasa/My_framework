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
require_once './ssr.php';
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
    'home' => 'home',
    'news' => 'news'
 
    // 'about' => 'about',
    // 'contact' => 'contact',
];

$apiEndpoints = [
     'home' => 'http://localhost:8080/dpm_0.1/teaching',
    '{language}/tletter' => 'http://localhost:8080/dpm_0.1/{language}/teaching',
    '{language}/home' => 'http://localhost:8080/dpm_0.1/{language}/teaching',
    
    // 'about' => 'http://localhost:8080/dpm_0.1/teaching',
    // 'contact' => 'http://localhost:8080/dpm_0.1/teaching',
];

$templatePath = '';

$requestUri = $_SERVER['REQUEST_URI'];

$route = trim(parse_url($requestUri, PHP_URL_PATH), '/');
$route = preg_replace('/^dpm_0\.1\//', '', $route);

$routeParts = explode('/', $route);
// $route = end($routeParts);
// $language = $routeParts[0];

$ssr = new SSR($routes, $apiEndpoints, $templatePath);
// $language = $ssr->getLanguageFromRoute($routeParts[0]);
$ssr->setLanguage($routeParts[0]);

$ssr->replaceLanguagePlaceholder($routeParts[0]); 

// var_dump($routeParts[1]);

// if (isset($routes[$route])) {
   

// Set the template path based on the route




switch ($routeParts[1]) {

    case 'home':
        $ssr->setTemplatePath('home');
        break;
    case 'tletter':
        $ssr->setTemplatePath('teaching.html');
         break;
    case 'css':
            $cssFileName = end($routeParts);
            $ssr->setTemplatePath($cssFileName);
    case 'js':
            $jsFileName = end($routeParts);
            $ssr->setTemplatePath($jsFileName);
        break;

    default:
        //  $ssr->setTemplatePath('derekprince.css');
        //  $ssr->setTemplatePath('normalize.css');
      
        break;
}

// $ssr->setTemplatePath('home.php');
$ssr->render($route);

 
 ?>