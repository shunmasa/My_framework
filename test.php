<?php



require_once './backend/database/connect.php';
require_once './backend/core/auth.php';
require_once './backend/core/api_caches.php';

$dbConnect = new DatabaseConnect();
$authentication = new Authentication($dbConnect);
$redisCache = new RedisCache();

$email = 'newuser@example.com';
$password = 'newuser_password';

$loginSuccessful = $authentication->login($email, $password);

if ($loginSuccessful) {
    $user = $authentication->getUser();
    echo 'Logged in as: ' . $user['email'];

    // Set the auth_token in Redis cache
    $key = 'auth_token:' . $user['id'];
    $data = ['auth_token' => $user['token']];

    $expiration = 86400; // 24 hours expiration

    $redisCache->set($key, $data, $expiration);
    $cachedData = $redisCache->get($key);
    error_log("....: " . print_r(  $cachedData , true));
} else {
    echo 'Login failed.';
}


// $dbConnect = new DatabaseConnect();
// $authentication = new Authentication($dbConnect);


// $email = 'newuser@example.com';
// $password = 'newuser_password';

// $loginSuccessful = $authentication->login($email, $password);

// if ($loginSuccessful) {
//     $user = $authentication->getUser();
//     $code = $_COOKIE["auth_token"];
//     error_log("....: " . print_r($code, true));
//     echo 'Logged in as: ' . $user['email'];
// } else {
//     echo 'Login failed.';
// }
