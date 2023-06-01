<?php

require_once './backend/core/api_caches.php';
require_once './backend/core/auth.php';
require_once './backend/database/connect.php';
require_once './backend/controller/users/users.php';

class UsersApi {
    private $dbConnect;
    private $router;


    public function __construct($method, $endpoint) {
        $this->dbConnect = new DatabaseConnect();
        $this->router = new Router();
        $userController = new UsersController($this->dbConnect);
        $authentication = new AuthenticationRequest();
        $token = $authentication->getToken();



        $this->router->addRoute($method, $endpoint , function (Request $request) use ($userController,$token) {
             $user = $userController->getUser($token);
            return new Response($user->getBody());
        }, $this->dbConnect); 

    }

    public function handleRequest($request): Response {
        return $this->router->handle($request);
    }
}




?>