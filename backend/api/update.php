<?php

require_once './backend/core/api_caches.php';
require_once './backend/core/clientBody.php';
require_once './backend/database/connect.php';
require_once './backend/helper/util.php';
require_once './backend/controller/update/update.php';
require_once './backend/controller/category/category.php';
class UpdateApi {
    use UrlSeparationTrait;
    private $dbConnect;
    private $router;

    private $category;
   

    public function __construct($method, $endpoint) {
        $this->dbConnect = new DatabaseConnect();
        $this->router = new Router();
        $this->category = new CategoryController($this->dbConnect);
        $updateController = new UpdateController($this->dbConnect);
        $base = $this->getCollection($endpoint);
        $category_id = $this->getCategoryId($endpoint);
        $item_id = $this->getNewsId($endpoint);


    $this->router->addRoute( $method, $base . '/'. $category_id . '/'. $item_id,function ($request) use ($updateController, $category_id,$item_id) {
        $requestHandler = new RequestHandler();
      
        $name = $requestHandler->getName();
        $slug = $requestHandler->getSlug();
        $language = $requestHandler->getLanguage();
        $text = $requestHandler->getText();
        $article = $requestHandler->getArticle();

        $category_name = $this->category->checkCategoryExists($category_id);
        if($category_name === 'teaching') {
            $teaching = $updateController->updateTeaching($name,$slug,$text,$language, $category_id,$item_id);
            return new Response($teaching->getBody());
        } else if ($category_name === 'news'){
            $news = $updateController->updateNews($name,$slug,$article,$language, $category_id,$item_id);
            return new Response($news->getBody());
        }
      

    }, $this->dbConnect);

    }

    public function handleRequest($request): Response {
        return $this->router->handle($request);
    }



}
