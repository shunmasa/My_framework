<?php

//databse config class to structure for database class 
class DatabaseConfig {
    public string $host;
    public string $username;
    public string $password;
    public string $database;

    public function __construct(string $host, string $username, string $password, string $database) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
    }

}



?>