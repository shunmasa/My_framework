<?php



class ResourceController {
    private PDO $db;

    public function __construct(DatabaseConnect $dbConnect) {
        $this->db = $dbConnect->connect();
    }
    // public function getResources(Request $request): Response {

    public function getResources(): Response {
        $statement = $this->db->query('SELECT * FROM resources');
        $resources = $statement->fetchAll();
        return new Response(json_encode($resources));
    }
}


?>