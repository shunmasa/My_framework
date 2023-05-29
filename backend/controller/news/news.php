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
        // $formattedData = array();
        // foreach ($data as $item) {
        //     $formattedData[] = array('fields' => $item);
        // }

        $metadata = [
            'title' => 'News Details',
            'description' => 'Get details of a specific news',
        ];

        $response = new Response($data, 200, $metadata);

        return $response;
    }


    public function fetchNewsBySlugAndLanguage($slug, $language): Response {
        $statement = $this->db->prepare('SELECT * FROM news WHERE slug = ? AND language = ?');
        $statement->execute([$slug, $language]);
    
        //$data = $statement->fetch(PDO::FETCH_ASSOC);-> object
        $data = $statement->fetchAll(PDO::FETCH_OBJ);//-> arraay of object
  

        // var_dump($teaching);
        if ($data) {
            $metadata = [
                'title' => 'News Details',
                'description' => 'Get details of a specific news',
            ];

            $response = new Response($data, 200, $metadata);
            return $response;
        } else {
            throw new Exception("Teaching not found");
        }
    
}
}
?>