<?php
require_once './backend/core/api.php';
require_once './backend/database/connect.php';
require_once './backend/controller/language/language.php';
require_once './backend/controller/resources/resource.php';
trait ApiTrait {
    use RouteTrait, MiddlewareTrait {
        MiddlewareTrait::applyMiddleware insteadof RouteTrait;
    }

    public function __construct(DatabaseConnect $dbConnect) {
        $languageController = new LanguageController($dbConnect);
        $resourceController = new ResourceController($dbConnect);
        $this->addRoute('GET', '/language', [$languageController, 'getAllLanguages'], $dbConnect);
        $this->addRoute('GET', '/resources', [$resourceController, 'getResources'], $dbConnect);

        $this->addMiddleware(function(Request $request) {
            return $request;
        });

        $this->addMiddleware(function(Request $request) {
            return $request;
        });
    }

    public function handleRequest(Request $request): Response {
        $request = $this->applyMiddleware($request);
        $response = $this->handleRouteRequest($request);
        // error_log("rrr: " . print_r($response , true));
        if (!$response) {
            $response = new Response(json_encode(['error' => 'Not found']), 404);
        }
        $response = $this->applyMiddleware($response);
        $response->send();
        return $response;
    }
}



?>