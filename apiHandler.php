<?php
require_once './backend/core/api_caches.php';
require_once './backend/core/rateLimite.php';
require_once './backend/core/auth.php';


class ApiHandler {
    public static function handleApiRequest($apiClass, $requestMethod, $requestUri) {
        $api = new $apiClass($requestMethod, $requestUri);
        $request = new Request($requestMethod, $requestUri);
        $response = $api->handleRequest($request);
        $response->send();
    }

    public static function authHandleApiRequest($apiClass, $requestMethod, $requestUri) {
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
}



?>