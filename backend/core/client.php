<?php
use Predis\Client;
interface CacheInterface {
    public function get(string $key);
    public function set(string $key, $data, int $expiration = 0);
    public function delete(string $key);
    public function incr(string $key): int;
    public function expire(string $key, int $expiration);
}

class RedisCache implements CacheInterface {
    private $redis;

    public function __construct() {
        $this->redis = new Client([
            'scheme' => 'tcp',
            'host' => '127.0.0.1',
            'port' => 6379,
        ]);
    }

    public function get(string $key) {
        $cachedData = $this->redis->get($key);
        if ($cachedData) {
            error_log("Cache hit for key: $key");
            return unserialize($cachedData);
        } else {
            error_log("Cache miss for key: $key");
            return null;
        }
    }

    public function set(string $key, $data, int $expiration = 0) {
        $serializedData = serialize($data);
        if ($expiration > 0) {
            $this->redis->setex($key, $expiration, $serializedData);
        } else {
            $this->redis->set($key, $serializedData);
        }
    }

    public function delete(string $key) {
        $this->redis->del([$key]);
    }

    public function incr(string $key): int {
        return $this->redis->incr($key);
    }

    public function expire(string $key, int $expiration) {
        $this->redis->expire($key, $expiration);
    }
}


trait RequestFilter {
    private function filterArray($array) {
        if (!is_array($array)) {
            return $array;
        }

        $filteredArray = [];

        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $filteredArray[$key] = $this->filterArray($value);
            } else {
                $filteredArray[$key] = $this->filterValue($value);
            }
        }

        return $filteredArray;
    }

    private function filterValue($value) {
        // Apply necessary filtering/sanitization here
        // For example, you can use functions like htmlspecialchars or htmlentities

        // Example using htmlspecialchars
        return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
    }
}

class ClientRequest {
    use RequestFilter;

    private $body;
    private $headers;
    private $rateLimiter;
    private $validator;
    private $statusCode;
    private $errorMessage;

    public function __construct($limit = 100, $interval = 3600, $expectedFields = []) {
        $this->body = $this->parseRequestBody();
        $this->headers = $this->parseRequestHeaders();
        $this->rateLimiter = new RateLimiter($limit, $interval);
        $this->validator = new InputValidator($expectedFields);
        $this->statusCode = 200;
        $this->errorMessage = '';
        $this->filterInput();
    }

    private function parseRequestBody() {
        $requestBody = file_get_contents('php://input');
        $decodedBody = json_decode($requestBody, true);
        return $decodedBody;
    }

    private function parseRequestHeaders() {
        $headers = [];
        foreach ($_SERVER as $key => $value) {
            if (substr($key, 0, 5) === 'HTTP_') {
                $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
                $headers[$header] = $value;
            }
        }
        return $headers;
    }

    private function filterInput() {
        $this->body = $this->filterArray($this->body);
        $this->headers = $this->filterArray($this->headers);
    }

    public function getBody() {
        return $this->body;
    }

    public function getHeaders() {
        return $this->headers;
    }

    public function validate() {
        $isValid = $this->validator->validate($this->body);

        if (!$isValid) {
            $this->addError(400, 'Invalid input');
        }

        return $isValid;
    }

    public function checkRateLimit() {
        $isWithinLimit = $this->rateLimiter->checkLimit();

        if (!$isWithinLimit) {
            $this->addError(429, 'Rate limit exceeded');
        }

        return $isWithinLimit;
    }

    public function addError($statusCode, $errorMessage) {
        $this->statusCode = $statusCode;
        $this->errorMessage = $errorMessage;
    }

    public function hasErrors() {
        return $this->statusCode !== 200;
    }

    public function getStatusCode() {
        return $this->statusCode;
    }

    public function getErrorMessage() {
        return $this->errorMessage;
    }
}

class InputValidator {
    private $expectedFields;

    public function __construct($expectedFields) {
        $this->expectedFields = $expectedFields;
    }

    public function validate($data) {
        foreach ($this->expectedFields as $field) {
            if (!isset($data[$field])) {
                return false;
            }
        }
        return true;
    }
}

interface RateLimitStorageInterface {
    public function getRequests($key);
    public function incrementRequests($key, $expiration);
}

class RateLimiter {
    private $limit;
    private $interval;
    private $storage;

    public function __construct($limit = 100, $interval = 3600) {
        $this->limit = $limit;
        $this->interval = $interval;
        $this->storage = new RedisRateLimitStorage();
    }

    public function checkLimit() {
        $ipAddress = $this->getClientIPAddress();
        $key = $this->generateRateLimitKey($ipAddress);

        $requests = $this->storage->getRequests($key);

        if ($requests >= $this->limit) {
            return false;
        }

        $this->storage->incrementRequests($key, $this->interval);

        return true;
    }

    private function getClientIPAddress() {
        // Adjust this code to get the client's IP address based on your server environment
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }

        return $ip;
    }

    private function generateRateLimitKey($ipAddress) {
        return 'rate_limit:' . $ipAddress;
    }
}

class RedisRateLimitStorage implements RateLimitStorageInterface {
    private $redis;

    public function __construct() {
        $this->redis = new RedisCache();
    }

    public function getRequests($key) {
        $requests = $this->redis->get($key);
        return $requests ? (int) $requests : 0;
    }

    public function incrementRequests($key, $expiration) {
        $requests = $this->redis->incr($key);
        if ($requests === 1){
    // Set the expiration for the key if it doesn't exist
    $this->redis->expire($key, $expiration);
}
}
}
class RateLimitStorage implements RateLimitStorageInterface {
    private $cache;

    public function __construct(CacheInterface $cache) {
        $this->cache = $cache;
    }

    public function getRequests($key) {
        $requests = $this->cache->get($key);
        return $requests ? (int) $requests : 0;
    }

    public function incrementRequests($key, $expiration) {
        $requests = $this->cache->incr($key);
        if ($requests === 1) {
            // Set the expiration for the key if it doesn't exist
            $this->cache->expire($key, $expiration);
        }
    }
}

?>