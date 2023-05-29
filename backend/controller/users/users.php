<?php
require_once './backend/database/connect.php';

class UsersController {
    private PDO $db;

    public function __construct(DatabaseConnect $dbConnect) {
        $this->db = $dbConnect->connect();
    }
    

    public function register(string $email, string $password): bool {
 
        $query = "SELECT * FROM Users WHERE email = :email";
        $statement = $this->db->prepare($query);
        $statement->execute(['email' => $email]);
        $user = $statement->fetch(PDO::FETCH_ASSOC);

        if ($user) {
         
            return false;
        }


        $token = bin2hex(random_bytes(16));

        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insert the new user into the database
        $query = "INSERT INTO Users (email, password, token) VALUES (:email, :password, :token)";
        $statement = $this->db->prepare($query);
        $statement->execute(['email' => $email, 'password' => $hashedPassword, 'token' => $token]);

        return true;
    }

    public function login(string $email, string $password): bool {
        $query = "SELECT * FROM Users WHERE email = :email";
        $statement = $this->db->prepare($query);
        $statement->execute(['email' => $email]);
        $user = $statement->fetch(PDO::FETCH_ASSOC);
      
     
        if ($user && password_verify($password, $user['password'])) {
            // Generate a new token
            $token = bin2hex(random_bytes(16));

      

          
          
            // Save the token in the database
            $this->saveToken($user['id'], $token);

            // Update the token in the Users table
            $this->updateUserToken($user['id'], $token);
            setcookie('auth_token', $token, time() + 3600, '/');
            // $response = new Response();
            // $response->setMessage('Login successful');
            // $response->setStatusCode(200);
            // $response->send();
        
            return true;
        }

        return false;
    }

    public function logout(): void {
        if ($this->getAuthCookie() !== null) {
            $token = $this->getAuthCookie();
            $this->deleteToken($token);
            setcookie('auth_token', '', time() - 3600, "/"); // Expire the cookie
        }
    }

    public function isLoggedIn(): bool {
        return $this->getAuthCookie() !== '';
    }

    public function getUser(): ?array {
        $token = $this->getAuthCookie();
        error_log("....: " . print_r(  $token, true));
        if ($token !== null) {
            // Check if the token is valid
            if ($this->isTokenValid($token)) {
                $user = $this->getUserByToken($token);
                return $user;
            }
        }
    
        // User is not authenticated
        return null;
    }
    
    private function getAuthCookie(): ?string {
        if (isset($_COOKIE['auth_token'])) {
            return $_COOKIE['auth_token'];
        }
        return '';
    }

    private function isTokenValid(string $token): bool {
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

    private function deleteToken(string $token): void {
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


$dbConnect = new DatabaseConnect();
$usersController = new UsersController($dbConnect);

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

$user = $usersController->getUser();
if ($user) {
    echo 'User details: ' . print_r($user, true);
} else {
    echo 'User is not authenticated.';
}

//  $email = '12345@example.com';
// $password = '1234567';
// $result = $usersController->login($email, $password);
// if ($result) {
//     echo 'Login successful.';
// } else {
//     echo 'Invalid email or password.';
// }
?>