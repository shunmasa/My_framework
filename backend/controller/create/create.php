<?php
require_once './backend/database/connect.php';
class CreateController {
    private PDO $db;

    public function __construct(DatabaseConnect $dbConnect) {
        $this->db = $dbConnect->connect();
       
    }

        public function createTeaching($name, $slug, $text, $language , $category_id): Response {
            $query = 'INSERT INTO Teaching (name, slug, text, language,category_id) VALUES (:name, :slug, :text, :language,:category_id)';
            $statement = $this->db->prepare($query);
            $statement->bindParam(':name', $name);
            $statement->bindParam(':slug', $slug);
            $statement->bindParam(':text', $text);
            $statement->bindParam(':language', $language);
            $statement->bindParam(':category_id', $category_id);
            $statement->execute();
    
            $response = new Response(['message' => 'Teaching created']);
            return $response;
        }

        public function createNews($name, $slug, $article, $language , $category_id): Response {
            $query = 'INSERT INTO News (name, slug, article, language,category_id) VALUES (:name, :slug, :article, :language,:category_id)';
            $statement = $this->db->prepare($query);
            $statement->bindParam(':name', $name);
            $statement->bindParam(':slug', $slug);
            $statement->bindParam(':article', $article);
            $statement->bindParam(':language', $language);
            $statement->bindParam(':category_id', $category_id);
            $statement->execute();
    
            $response = new Response(['message' => 'News created']);
            return $response;
        }
    
}


?>