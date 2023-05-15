<?php


require_once 'index.php';
require_once './backend/config/index.php';
require_once './backend/database/index.php';
require_once './backend/helper/loadEnv.php';
require_once './vendor/autoload.php';


// trait LoadEnvVariables {
//     public function loadEnvVariables(): void {
//         $dotenv = Dotenv\Dotenv::createUnsafeImmutable('./');
//         $dotenv->load();
//     }
//   }
  
  class DatabaseConnect {
  


    private Database $db;
    private DatabaseConfig $config;
    private PDO $pdo;
  
    public function __construct() {
    $loader = new LoadEnvVariables();
    $loader->loadEnvVariables();
     
      // if($_SERVER['SERVER_NAME'] == 'localhost'){
      //   $this->config = new DatabaseConfig(
      //     getenv('DV_DB_HOST'),
      //     getenv('DV_DB_USERNAME'),
      //     getenv('DV_DB_PASSWORD'),
      //     getenv('DV_DB_DATABASE')
      // );
      // }else{
      //   $this->config = new DatabaseConfig(
      //     getenv('PD_DB_HOST'),
      //     getenv('PD_DB_USERNAME'),
      //     getenv('PD_DB_PASSWORD'),
      //     getenv('PD_DB_DATABASE')
      // );
      //  }
  
      //   $dotenv = Dotenv\Dotenv::createUnsafeImmutable('./');
      // $dotenv->load();
  
  
      $this->config = new DatabaseConfig(
          getenv('DV_DB_HOST'),
          getenv('DV_DB_USERNAME'),
          getenv('DV_DB_PASSWORD'),
          getenv('DV_DB_DATABASE')
      );
    
    }
  
    public function connect(): ?PDO {
      try {
          $this->db = new Database($this->config);
          $this->pdo = $this->db->connect();
          error_log("Database connection successful.");
          return $this->pdo;
    
      } catch (PDOException $e) {
          error_log("Could not connect to the database: " . $e->getMessage());
          return null;
      }
  }
  }


  $database = new DatabaseConnect();
  $pdo = $database->connect();
?>