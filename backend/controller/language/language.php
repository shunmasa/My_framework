<?php

class LanguageController {
    private PDO $db;

    public function __construct(DatabaseConnect $dbConnect) {
        $this->db = $dbConnect->connect();
       

    }

    // public function getAllLanguages(Request $request): Response {
        public function getAllLanguages(): Response {
        $statement = $this->db->query('SELECT * FROM language');
      
        $languages = $statement->fetchAll();
       // error_log("....: " . print_r($statement , true));
        return new Response(json_encode($languages));
        
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