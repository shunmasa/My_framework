<?php
require_once './backend/controller/users/users.php';
require_once './backend/database/connect.php';


class AuthenticationRequest
{
    public function getToken()
    {
        $token = null;
        if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
            if (strpos($authHeader, 'Bearer ') === 0) {
                $token = substr($authHeader, 7);
            }
        }

        return $token;
    }

    public function verifyToken()
    {
        $token = $this->getToken();

        if ($token) {
            $usersController = new UsersController(new DatabaseConnect());
            return $usersController->isTokenValid($token);
        }

        return false;
    }
}


?>