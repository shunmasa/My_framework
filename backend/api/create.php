<?php

require_once './backend/core/api_caches.php';
require_once './backend/core/clientBody.php';
require_once './backend/database/connect.php';
require_once './backend/helper/util.php';
require_once './backend/controller/create/create.php';
require_once './backend/controller/category/category.php';
class CreateApi {
    use UrlSeparationTrait;
    private $dbConnect;
    private $router;

    private $category;
   

    public function __construct($method, $endpoint) {
        $this->dbConnect = new DatabaseConnect();
        $this->router = new Router();
        $this->category = new CategoryController($this->dbConnect);
        $createController = new CreateController($this->dbConnect);
        // $base = $this->getCollection($endpoint);
        $category_id = $this->getCategoryId($endpoint);



    $this->router->addRoute( $method, '/collections/'. $category_id, function ($request) use ($createController, $category_id) {
        $requestHandler = new RequestHandler();
      
        $name = $requestHandler->getName();
        $slug = $requestHandler->getSlug();
        $language = $requestHandler->getLanguage();
        $text = $requestHandler->getText();
        $article = $requestHandler->getArticle();

        $category_name = $this->category->checkCategoryExists($category_id);
        if($category_name === 'teaching') {
            $teaching = $createController->createTeaching($name,$slug,$text,$language, $category_id);
            return new Response($teaching->getBody());
        } else if ($category_name === 'news'){
            $news = $createController->createNews($name,$slug,$article,$language, $category_id);
            return new Response($news->getBody());
        }
      

    }, $this->dbConnect);

    }

    public function handleRequest($request): Response {
        return $this->router->handle($request);
    }



}


// $teachingApi = new CreateApi("POST", '/collections/1');

// $request = new Request("POST", '/collections/1');

// $response = $teachingApi->handleRequest($request);
// $response->send();


?>