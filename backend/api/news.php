<?php

require_once './backend/core/api_test.php';
require_once './backend/database/connect.php';
require_once './backend/controller/news/news.php';

class NewsApi {
    private $dbConnect;
    private $router;

    public function __construct($method, $language, $endpoint, $id) {
        $this->dbConnect = new DatabaseConnect();
     
        $this->router = new Router();
   
        $newsController = new NewsController($this->dbConnect);

        $this->router->addRoute($method, '/'.$language . $endpoint, function ($request) use ($newsController, $language) {
            $news = $newsController->getAllNewsByLanguage($language);
            return new Response($news);
        }, $this->dbConnect);

        $this->router->addRoute($method, '/' .$language  .$endpoint . '/'.$id, function ($request) use ($newsController, $language, $id) {
            $news = $newsController->fetchNewsByIdAndLanguage($id, $language);
            return new Response($news);
        }, $this->dbConnect);
    }

    public function handleRequest($request) {
        return $this->router->handle($request);
    }
}

?>