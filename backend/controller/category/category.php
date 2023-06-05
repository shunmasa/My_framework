<?php
class CategoryController {
    private PDO $db;

    public function __construct(DatabaseConnect $dbConnect) {
        $this->db = $dbConnect->connect();
    }

    public function checkCategoryExists(int $categoryId): string {
        $statement = $this->db->prepare('SELECT name FROM Category WHERE id = ?');
        $statement->execute([$categoryId]);
        $data = $statement->fetch(PDO::FETCH_ASSOC);
    
        if ($data) {
            return $data['name'];
        } else {
            throw new Exception("Category not found");
        }
    }
    
}


?>
