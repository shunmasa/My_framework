<?php
require_once './backend/core/api_caches.php';
//require_once './backend/core/api_meta.php';
require_once './backend/database/connect.php';
require_once './backend/controller/teaching/teaching.php';
require_once './backend/helper/util.php';
class TeachingApi {
   use UrlSeparationTrait;
    private $dbConnect;
    private $router;

    public function __construct($method, $endpoint) {
        $this->dbConnect = new DatabaseConnect();
        $this->router = new Router();
        $teachingController = new TeachingController($this->dbConnect);
    

        $base = $this->getBase($endpoint);
        $language = $this->getLanguage($endpoint);
        $slug = $this->getSlug($endpoint);
     

        $this->router->addRoute($method, '/teaching', function ($request) use ($teachingController) {
        
          $teaching = $teachingController->getAllTeachings();
          return new Response($teaching->getBody(),$teaching->getStatusCode(),$teaching->getMetadata());

      }, $this->dbConnect);


     
      $this->router->addRoute($method, '/'.$language.$base, function ($request) use ($teachingController,$language) {
      
        $teachings = $teachingController->getAllTeachingsByLanguage($language);
         return new Response($teachings->getBody(),$teachings->getStatusCode(),$teachings->getMetadata());
     }, $this->dbConnect);

   
   
    $this->router->addRoute( $method, '/'.$language.$base.'/'.$slug, function ($request) use ($teachingController,$slug,$language) {
        
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