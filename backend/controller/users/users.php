<?php
require_once './backend/database/connect.php';
require_once './backend/core/api_caches.php';
class UsersController {
    private PDO $db;
    // private RedisCache $radis;
    public function __construct(DatabaseConnect $dbConnect) {
        $this->db = $dbConnect->connect();
     
    }


    public function registerUser(string $email, string $password, string $name): Response {
        $query = "SELECT email, password FROM Users WHERE email = :email";
        $statement = $this->db->prepare($query);
        $statement->execute(['email' => $email]);
        $user = $statement->fetch(PDO::FETCH_ASSOC);
    
        if ($user) {
            $errorResponse = new Response(['error' => 'Registered email already exists'], 401);
            return $errorResponse;
        }
    
        $token = bin2hex(random_bytes(16));
    
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
        // Insert the new user into the database
        $query = "INSERT INTO Users (email, password, name, token) VALUES (:email, :password, :name, :token)";
        $statement = $this->db->prepare($query);
        $statement->execute(['email' => $email, 'password' => $hashedPassword, 'name' => $name, 'token' => $token]);
    
        

        // $this->radis->set('auth_token', serialize($token));

        // Create the response with the registered user data
        $response = new Response(['message' => 'New user is registered']);
    
        return $response;
    }
    

    public function getToken(string $email, string $password): Response {
        $query = "SELECT id, email, password FROM Users WHERE email = :email";
        $statement = $this->db->prepare($query);
        $statement->execute(['email' => $email]);
        $user = $statement->fetch(PDO::FETCH_ASSOC);
      
     
        if ($user && password_verify($password, $user['password'])) {
            // Generate a new token
            $token = bin2hex(random_bytes(16));
          
            $this->saveToken($user['id'], $token);

            $this->updateUserToken($user['id'], $token);
            $response = new Response(['token' => $token]);
            return $response;
        }

        $errorResponse = new Response(['error' => 'Invalid email or password'], 401);
        return $errorResponse;
    }

 

    public function getUser(string $token): Response {
       
        if ($token !== null) {
                if ($this->isTokenValid($token)) {
                    $user = $this->getUserByToken($token);
                    
                    $response = new Response($user,200);
                    return $response;
                }
                $errorResponse = new Response(['error' => 'No Token exists'], 401);
                return $errorResponse;
            }
            $errorResponse = new Response(['error' => 'No User exists'], 401);
            return $errorResponse;
         }
        
    



    public function isTokenValid(string $token): bool {
        $query = "SELECT * FROM Auth_tokens WHERE token = :token";
        $statement = $this->db->prepare($query);
        $statement->execute(['token' => $token]);
        $tokenData = $statement->fetch(PDO::FETCH_ASSOC);
        $isValid = ($tokenData !== false);

        if (!$isValid) {
            // Token is invalid
            echo 'Invalid token.';
        }

        return $isValid;
    }

    private function saveToken(int $userId, string $token): void {
        $query = "INSERT INTO Auth_tokens (user_id, token) VALUES (:user_id, :token)";
      
        $statement = $this->db->prepare($query);
        $statement->execute(['user_id' => $userId, 'token' => $token]);
    }

    private function updateUserToken(int $userId, string $token): void {
        $query = "UPDATE Users SET token = :token WHERE id = :user_id";
        $statement = $this->db->prepare($query);
        $statement->execute(['token' => $token, 'user_id' => $userId]);
    }

    public function deleteToken(string $token): void {
        $query = "DELETE FROM Auth_tokens WHERE token = :token";
        $statement = $this->db->prepare($query);
        $statement->execute(['token' => $token]);
    }

    private function getUserByToken(string $token): ?array {
        
        $query = "SELECT Users.* FROM Users INNER JOIN Auth_tokens ON users.id = auth_tokens.user_id WHERE auth_tokens.token = :token";
        $statement = $this->db->prepare($query);
        $statement->execute(['token' => $token]);
     
        $user = $statement->fetch(PDO::FETCH_ASSOC);
     

        return $user ?: null;
    }
}

// $dbConnect = new DatabaseConnect();
// $usersController = new UsersController($dbConnect);

// $user = $usersController->getUser();
// if ($user) {
//     echo 'User details: ' . print_r($user, true);
// } else {
//     echo 'User is not authenticated.';
// }

// if ($usersController->isLoggedIn()) {
//     echo 'User is logged in.';
// } else {
//     echo 'User is not logged in.';
// }

// $user = $usersController->getUser('8ac10bf8d24a17f5c9059f6532ccf1c7');
// error_log("....: " . print_r($user , true));
// // if ($result) {
// if ($user) {
//     echo 'User details: ' . print_r($user, true);
// } else {
//     echo 'User is not authenticated.';
// }

?>