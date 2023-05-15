<?php

class LanguageController {
    private PDO $db;

    public function __construct(DatabaseConnect $dbConnect) {
        $this->db = $dbConnect->connect();
       

    }

    // public function getAllLanguages(Request $request): Response {
        public function getAllLanguages(): Response {
            $statement = $this->db->query('SELECT * FROM language');
        
            $data = [];
            while($row = $statement->fetch(PDO::FETCH_ASSOC)){
                $data[] = $row;
            }
            
            return new Response(json_encode($data));
        }

    function fetchLanguageById($id): Response {
        $statement = $this->db->query('SELECT * FROM languages WHERE id = ?');
        $statement->execute([$id]);
        $language = $statement->fetch(PDO::FETCH_ASSOC);
        if ($language) {
            return new Response(json_encode($language));;
        } else {
            throw new Exception("Language not found");
        }
    }



    
}

?>