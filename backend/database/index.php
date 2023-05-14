<?php

class Database {
    private DatabaseConfig $config;

    public function __construct(DatabaseConfig $config) {
        $this->config = $config;
    }

    public function connect(): PDO {
        $dsn = "mysql:host={$this->config->host};dbname={$this->config->database}";
        $pdo = new PDO($dsn, $this->config->username, $this->config->password);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    }
}


?>