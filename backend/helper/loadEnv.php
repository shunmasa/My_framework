<?php
require_once './vendor/autoload.php';

class LoadEnvVariables {
    public function loadEnvVariables(): void {
        $dotenv = Dotenv\Dotenv::createUnsafeImmutable('./');
        $dotenv->load();
    }
}

?>