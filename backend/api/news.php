<?php

require_once './backend/core/api_caches.php';
require_once './backend/database/connect.php';
require_once './backend/controller/news/news.php';
require_once './backend/helper/util.php';
class NewsApi {
    use SeparateUrlTrait; 
    private $dbConnect;
    private $router;

    public function __construct($method, $endpoint) {
        $this->dbConnect = new DatabaseConnect();
  
        $this->router = new Router();
   
        $newsController = new NewsController($this->dbConnect);
        $urlParts = $this->separateUrl($endpoint);
        $base = '/' .$urlParts[1];
        $language = $urlParts[0];
        $slug = isset($urlParts[2]) ? $urlParts[2] : '';


        $this->router->addRoute($method, '/'.$language.$base, function ($request) use ($newsController, $language) {
            $news = $newsController->getAllNewsByLanguage($language);
            return new Response($news->getBody(),$news->getStatusCode(),$news->getMetadata());
        }, $this->dbConnect);

   
        $this->router->addRoute($method, '/'.$language.$base.'/'.$slug,  function ($request) use ($newsController, $language, $slug) {
            $news = $newsController->fetchNewsBySlugAndLanguage($slug, $language);
            return new Response($news->getBody(),$news->getStatusCode(),$news->getMetadata());
        }, $this->dbConnect);
    }

    public function handleRequest($request) {
        return $this->router->handle($request);
    }
}


// $newsApi = new NewsApi("GET", 'en','/news','0123-en');

// $request = new Request("GET", '/en/news/0123-en');

// $response = $newsApi->handleRequest($request);
// $response->send();
 ?>