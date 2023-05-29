<?php

class TeachingController {
    private PDO $db;

    public function __construct(DatabaseConnect $dbConnect) {
        $this->db = $dbConnect->connect();
       

    }

     //   $formattedData = array();
            // foreach ($data as $item) {
            //     $formattedData[] = array('fields' => $item);
            // }



        public function getAllTeachingsByLanguage($language): Response {
            $query = "SELECT * FROM Teaching WHERE language = :language";
            $statment = $this->db->prepare($query);
            $statment->bindParam(':language', $language);
            $statment->execute();
            $data = $statment->fetchAll(PDO::FETCH_ASSOC);


            $metadata = [
                'title' => 'Teaching Details',
                'description' => 'Get details of a specific teaching',
            ];

            $response = new Response($data, 200, $metadata);

            return $response;
           
        }
        


        function fetchTeachingBySlugAndLanguage($slug, $language): Response {
         $statement = $this->db->prepare('SELECT * FROM teaching WHERE slug = ? AND language = ?');
            $statement->execute([$slug, $language]);
            
            // $data = $statement->fetch(PDO::FETCH_ASSOC); -> object
            $data = $statement->fetchAll(PDO::FETCH_OBJ);//-> arraay of object

             if ($data) {
                $metadata = [
                    'title' => 'Teaching Details',
                    'description' => 'Get details of a specific teaching',
                ];
    
                $response = new Response($data, 200, $metadata);
                return $response;
            } else {
                throw new Exception("Teaching not found");
            }
        }
        


    
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


?>