<?php

require_once './backend/core/api_caches.php';
require_once './backend/database/connect.php';
require_once './backend/controller/news/news.php';

class NewsApi {
    private $dbConnect;
    private $router;

    public function __construct($method, $language, $endpoint, $slug) {
        $this->dbConnect = new DatabaseConnect();
  
        $this->router = new Router();
   
        $newsController = new NewsController($this->dbConnect);

        $this->router->addRoute($method, '/'.$language . $endpoint, function ($request) use ($newsController, $language) {
            $news = $newsController->getAllNewsByLanguage($language);
            return new Response($news->getBody(),$news->getStatusCode(),$news->getMetadata());
        }, $this->dbConnect);

   
        $this->router->addRoute($method, '/' .$language  .$endpoint . '/'.$slug, function ($request) use ($newsController, $language, $slug) {
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