<?php

require_once './backend/core/api_caches.php';
require_once './backend/database/connect.php';
require_once './backend/controller/users/users.php';

class UsersApi {
    private $dbConnect;
    private $router;


    public function __construct($method, $endpoint) {
        $this->dbConnect = new DatabaseConnect();
        $this->router = new Router();
        $userController = new UsersController($this->dbConnect);

        // $this->router->addRoute($method, $endpoint, function (Request $request) use ($userController) {
        //      $userController->register('','');
        //     return new Response();
        // }, $this->dbConnect); 

        // $this->router->addRoute($method, $endpoint , function (Request $request) use ($userController) {
        // // $email = $request->getParam('email');
        // // $password = $request->getParam('password');
       
        //   $userController->login('newuser@example.com','newuser_password');
        //     return  new Response();
        // }, $this->dbConnect); 

        // $this->router->addRoute($method, $endpoint , function (Request $request) use ($userController) {
        //     $userController->logout();
        //     return new Response();
        // }, $this->dbConnect); 

        $this->router->addRoute($method, $endpoint , function (Request $request) use ($userController) {
             $userController->getUser();
            return new Response();
        }, $this->dbConnect); 
    }

    public function handleRequest($request): Response {
        return $this->router->handle($request);
    }
}



// $usersApi = new UsersApi("GET", '/getUser');
// // $params = array(
// //     'email' => '12345@example.com',
// //     'password' => '1234567'
// // );

// $request = new Request("GET", '/getUser');

// $response = $usersApi->handleRequest($request);
// $response->send();



?>