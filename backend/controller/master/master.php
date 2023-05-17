<?php

class MasterController {
    private PDO $db;

    public function __construct(DatabaseConnect $dbConnect) {
        $this->db = $dbConnect->connect();
    }
    // public function getResources(Request $request): Response {

    public function getAllMaster(): Response {
        $statement = $this->db->query('SELECT * FROM master');
        $data = [];
        while($row = $statement->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        
        return new Response(json_encode($data));
    }
}


?>
