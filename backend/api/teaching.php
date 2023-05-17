<?php
require_once './backend/core/api_test.php';
require_once './backend/database/connect.php';
require_once './backend/controller/teaching/teaching.php';
class TeachingApi {
    private $dbConnect;
    private $router;

    public function __construct($method,$language, $endpoint,$id) {
        $this->dbConnect = new DatabaseConnect();
     
        $this->router = new Router();
   

        $teachingController = new TeachingController($this->dbConnect);
        // $teaching = $teachingController->fetchTeachingByIdAndLanguage($id, $language);
        // var_dump($endpoint);
        
        $this->router->addRoute($method, '/'.$language . $endpoint, function ($request) use ($teachingController, $language) {
            $teachings = $teachingController->getAllTeachingsByLanguage($language);
            return new Response($teachings);
        }, $this->dbConnect);

        
        $this->router->addRoute($method, '/' .$language  .$endpoint . '/'.$id, function ($request) use ($teachingController,$language,$id) {
            $teaching = $teachingController->fetchTeachingByIdAndLanguage($id, $language);
            return new Response($teaching);
        }, $this->dbConnect);
    }

    public function handleRequest($request) {
        return $this->router->handle($request);
    }
}



?>