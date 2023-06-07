<?php

require_once './backend/database/connect.php';

class UpdateController {
    private PDO $db;

    public function __construct(DatabaseConnect $dbConnect) {
        $this->db = $dbConnect->connect();
    }

    public function updateTeaching($name, $slug, $text, $language, $category_id, $teachingId): Response {
        $query = 'UPDATE Teaching SET name = :name, slug = :slug, text = :text, language = :language, category_id = :category_id WHERE id = :id';
        $statement = $this->db->prepare($query);
        $statement->bindParam(':name', $name);
        $statement->bindParam(':slug', $slug);
        $statement->bindParam(':text', $text);
        $statement->bindParam(':language', $language);
        $statement->bindParam(':category_id', $category_id);
        $statement->bindParam(':id', $teachingId);

        $statement->execute();

        $response = new Response(['message' => 'Teaching updated'], 200);
        return $response;
    }

    public function updateNews($name, $slug, $article, $language, $category_id,$newsId): Response {
        $query = 'UPDATE News SET name = :name, slug = :slug, article = :article, language = :language, category_id = :category_id WHERE id = :id';
        $statement = $this->db->prepare($query);
        $statement->bindParam(':name', $name);
        $statement->bindParam(':slug', $slug);
        $statement->bindParam(':article', $article);
        $statement->bindParam(':language', $language);
        $statement->bindParam(':category_id', $category_id);
        $statement->bindParam(':id', $newsId); 

        // Execute the query
        $statement->execute();

        $response = new Response(['message' => 'News updated'], 200);
        return $response;
    }
}



?>