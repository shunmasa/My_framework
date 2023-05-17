<?php

class TeachingController {
    private PDO $db;

    public function __construct(DatabaseConnect $dbConnect) {
        $this->db = $dbConnect->connect();
       

    }

    // public function getAllLanguages(Request $request): Response {
        // public function getAllTeachings(): Response {
         
        //     $statement = $this->db->query('SELECT * FROM teaching');
        
        //     $data = [];
        //     while($row = $statement->fetch(PDO::FETCH_ASSOC)){
        //         $data[] = $row;
        //     }
            
        //     return new Response(json_encode($data));
        // }


        public function getAllTeachingsByLanguage($language): Response {
            $query = "SELECT * FROM Teaching WHERE language = :language";
            $statment = $this->db->prepare($query);
            $statment->bindParam(':language', $language);
            $statment->execute();
            $data = $statment->fetchAll(PDO::FETCH_ASSOC);
        
            // Modify the output structure to match the desired format
            $formattedData = array();
            foreach ($data as $item) {
                $formattedData[] = array('fields' => $item);
            }
        
            return new Response(json_encode($formattedData));
        }
        


        function fetchTeachingByIdAndLanguage($id, $language): Response {
            $statement = $this->db->prepare('SELECT * FROM teaching WHERE id = ? AND language = ?');
            $statement->execute([$id, $language]);
            
            $teaching = $statement->fetch(PDO::FETCH_ASSOC);
            // var_dump($teaching);
            if ($teaching) {
                return new Response(json_encode($teaching));
            } else {
                throw new Exception("Teaching not found");
            }
        }
        


    
}

?>