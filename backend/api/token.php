<?php

require_once './backend/core/api_caches.php';
require_once './backend/core/clientBody.php';
require_once './backend/database/connect.php';
require_once './backend/controller/users/users.php';

class TokenApi {
    private $dbConnect;
    private $router;


    public function __construct($method, $endpoint) {
        $this->dbConnect = new DatabaseConnect();
        $this->router = new Router();
        $userController = new UsersController($this->dbConnect);

        $this->router->addRoute($method, $endpoint , function (Request $request) use ($userController) {
        $requestHandler = new RequestHandler();
        $email = $requestHandler->getEmail();
        $password = $requestHandler->getPassword();
        $token =$userController->getToken($email, $password);
        return  new Response($token->getBody());
        }, $this->dbConnect); 

    }

    public function handleRequest($request): Response {
        return $this->router->handle($request);
    }
}




?>