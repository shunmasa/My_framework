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


            public function getAllTeachings(): Response {
         
                $statment = $this->db->query('SELECT * FROM teaching');
                $statment->execute();
                $data  = $statment->fetchAll(PDO::FETCH_ASSOC);
                 
                
                $metadata = [
                    'title' => 'Teaching Details',
                    'description' => 'Get details of a specific teaching',
                ];
    
                $response = new Response($data, 200, $metadata);
    
                return $response;
            }
    


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
        


        // public function createTeaching($name, $slug, $text, $language): Response {
        //     $query = 'INSERT INTO Teaching (name, slug, text, language) VALUES (:name, :slug, :text, :language)';
        //     $statement = $this->db->prepare($query);
        //     $statement->bindParam(':name', $name);
        //     $statement->bindParam(':slug', $slug);
        //     $statement->bindParam(':text', $text);
        //     $statement->bindParam(':language', $language);
        //     $statement->execute();
    
        //     $response = new Response(['message' => 'Teaching created'], 200);
        //     return $response;
        // }
    
        // public function updateTeaching($id, $name, $slug, $text, $language): Response {
        //     $query = 'UPDATE Teaching SET name = :name, slug = :slug, text = :text, language = :language WHERE id = :id';
        //     $statement = $this->db->prepare($query);
        //     $statement->bindParam(':name', $name);
        //     $statement->bindParam(':slug', $slug);
        //     $statement->bindParam(':text', $text);
        //     $statement->bindParam(':language', $language);
        //     $statement->bindParam(':id', $id);
        //     $statement->execute();
    
    
        //     $response = new Response(['message' => 'Teaching updated'], 200);
        //     return $response;
        // }
        // public function deleteTeaching($id): Response {
          
        //     $query = 'DELETE FROM Teaching WHERE id = :id';
        //     $statement = $this->db->prepare($query);
        //     $statement->bindParam(':id', $id);
        //     $statement->execute();
    
          
    
        //     $response = new Response(['message' => 'Teaching deleted'], 200);
        //     return $response;
        // }
        
    }



?>