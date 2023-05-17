<?php



class NewsController {
    private PDO $db;

    public function __construct(DatabaseConnect $dbConnect) {
        $this->db = $dbConnect->connect();
    }
    // public function getResources(Request $request): Response {

    public function getAllNews(): Response {
        $statement = $this->db->query('SELECT * FROM news');
        $data = [];
        while($row = $statement->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        
        return new Response(json_encode($data));
    }


    public function getAllNewsByLanguage($language): Response {
        $query = "SELECT * FROM News WHERE language = :language";
        $statement = $this->db->prepare($query);
        $statement->bindParam(':language', $language);
        $statement->execute();
        $data =  $statement->fetchAll(PDO::FETCH_ASSOC);
        $formattedData = array();
        foreach ($data as $item) {
            $formattedData[] = array('fields' => $item);
        }
        return new Response(json_encode($formattedData));
    }

    public function fetchNewsByIdAndLanguage($id, $language): Response {
        $statement = $this->db->prepare('SELECT * FROM news WHERE id = ? AND language = ?');
        $statement->execute([$id, $language]);
    
        $news = $statement->fetch(PDO::FETCH_ASSOC);
        
        if ($news) {
            return new Response(json_encode($news));
        } else {
            throw new Exception("News not found");
        }
    }
    
}


?>