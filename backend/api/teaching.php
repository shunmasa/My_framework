<?php
require_once './backend/core/api_caches.php';
//require_once './backend/core/api_meta.php';
require_once './backend/database/connect.php';
require_once './backend/controller/teaching/teaching.php';
require_once './backend/helper/util.php';
class TeachingApi {
    use SeparateUrlTrait; 
    private $dbConnect;
    private $router;

    public function __construct($method, $endpoint) {
        $this->dbConnect = new DatabaseConnect();
        $this->router = new Router();
        $teachingController = new TeachingController($this->dbConnect);
     
        $urlParts = $this->separateUrl($endpoint);
        $base = '/' .$urlParts[1];
        $language = $urlParts[0];
        $slug = $urlParts[2];

        error_log("....: " . print_r( $urlParts, true));
      $this->router->addRoute($method, '/'.$language.$base, function ($request) use ($teachingController,$language) {
      
        $teachings = $teachingController->getAllTeachingsByLanguage($language);
         return new Response($teachings->getBody(),$teachings->getStatusCode(),$teachings->getMetadata());
     }, $this->dbConnect);

   
        

    $this->router->addRoute($method, '/'.$language.$base.'/'.$slug, function ($request) use ($teachingController,$slug,$language) {
        
            $teaching = $teachingController->fetchTeachingBySlugAndLanguage($slug,$language);
            return new Response($teaching->getBody(),$teaching->getStatusCode(),$teaching->getMetadata());

        }, $this->dbConnect);
  }

  public function handleRequest($request) {
    return $this->router->handle($request);
}
}




// $teachingApi = new TeachingApi("GET", '/en/teaching/0123-en');

// $request = new Request("GET", '/en/teaching/0123-en');

// $response = $teachingApi->handleRequest($request);
// $response->send();



?>