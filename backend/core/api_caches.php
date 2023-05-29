<?php
use Predis\Client;




class RedisCache {
    private  Client $redis;

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
        // setcookie('auth_token', $data['auth_token'], time() + 86400, "/");
    }

    public function delete(string $key) {
        $this->redis->del([$key]);
    }
}



class AuthenticationHeader {
    public function handle(Request $request, $next) {
        if (!$this->hasBearerToken($request)) {
            $token = $this->getCookieValue($request, 'auth_token');
            if ($token !== null) {
                $request->addHeader('Authorization', 'Bearer ' . $token);
            }
        }
        return $next($request);
    }

    private function hasBearerToken(Request $request): bool {
        $authorizationHeader = $request->getHeaders()['Authorization'] ?? null;
        if ($authorizationHeader && $this->startsWith(strtolower($authorizationHeader), 'bearer ')) {
            return true;
        }
        return false;
    }

    private function getCookieValue(Request $request, string $cookieName) {
        return $request->getParam($cookieName);
    }

    private function startsWith(string $haystack, string $needle): bool {
        return strpos($haystack, $needle) === 0;
    }
}




trait MetadataTrait {
    private function generateMetadata($data) {
        $title = $data[0]['title'] ?? null;
        $description = $data[0]['description'] ?? null;

        $metadata = [];

        if ($title !== null) {
            $metadata['X-Title'] = $title;
        }

        if ($description !== null) {
            $metadata['X-Description'] = $description;
        }

        return $metadata;
    }
}

class ResourceNotFoundException extends Exception {}

class ErrorHandler {
    public function handleException(Exception $exception): Response {
        if ($exception instanceof ResourceNotFoundException) {
            $response = new Response(['error' => 'Resource not found'], 404);
        } else {
            $response = new Response(['error' => 'Internal server error'], 500);
        }
        return $response;
    }
}



class Router {
    use RouteTrait;
    use MiddlewareTrait;
    private ErrorHandler $errorHandler;

    private RedisCache $cache;

    public function __construct() {
        $this->cache = new RedisCache();

    }

    public function handle(Request $request): Response {
        // Check if the response is cached

        // $cacheKey = $this->generateCacheKey($request);
        // $cachedResponse = $this->cache->get($cacheKey);
        // if ($cachedResponse) {
        //     return $cachedResponse;
        // }

        // try {
   
        //     $response = $this->handleRouteRequest($request);

        //     $this->cache->set($cacheKey, $response, 3600); // Cache for 1 hour
        // } catch (Exception $exception) {
        //     $response = $this->errorHandler->handleException($exception);
        // }
       $response = $this->handleRouteRequest($request);
        return $response;
    }

    public function renderHtmlTemplate(string $templateName, array $data): string {
        error_log("....: " . print_r(  $templateName , true));
        $templatePath = "./public/$templateName.html";
     
        $templateContent = file_get_contents($templatePath);
   
        // Replace placeholders with data
        foreach ($data as $key => $value) {
            $templateContent = str_replace('{{ ' . $key . ' }}', $value, $templateContent);
        }

        return $templateContent;
    }

    private function generateCacheKey(Request $request): string {
        // Generate a unique cache key based on the request properties
        return md5($request->getMethod() . $request->getUri());
    }
}

class Request {
    private string $method;
    private string $uri;
    private array $params;
    private array $headers;

    public function __construct(string $method, string $uri, array $params = []) {
        $this->method = $method;
        $this->uri = $uri;
        $this->params = $params;
        $this->headers = [];
    }

    public function getMethod(): string {
        return $this->method;
    }

    public function getUri(): string {
        return $this->uri;
    }

    public function getParam(string $name): ?string {
        return $this->params[$name] ?? null;
    }

    public function getPathInfo()
    {
        $queryStringPosition = strpos($_SERVER['REQUEST_URI'], '?');
        if ($queryStringPosition !== false) {
            return substr($_SERVER['REQUEST_URI'], 0, $queryStringPosition);
        }
        return $_SERVER['REQUEST_URI'];
    }
    
    public function addHeader(string $name, string $value): void {
        $this->headers[$name] = $value;
    }

    public function getHeaders(): array {
        return $this->headers;
    }
}

// interface ResponseInterface {
//     public function send();
//     public function setData(array $data);
//     public function getBody(): array;
//     public function getMetadata(): array;
//     public function getStatusCode(): int;
// }


//  class Response implements ResponseInterface {
//     use ResponseTrait, MetadataTrait;

//     private array $metadata;
//     private array $body;
//     private int $statusCode;

//     public function __construct(array $body = [] , int $statusCode = 200, array $metadata = []) {
//         $this->body = $body;
//         $this->statusCode = $statusCode;
//         $this->metadata = $metadata;
//     }

//     public function getBody(): array {
//         return $this->body;
//     }
//     public function setData(array $data) {
//         $this->body = $data;
//     }

//     public function getMetadata(): array {
//         return $this->metadata;
//     }

//     public function getStatusCode(): int {
//         return $this->statusCode;
//     }

//     public function send() {
//         http_response_code($this->statusCode);
     
//         $response = array(
//             'data' => $this->body,
//             'metadata' => $this->metadata
//         );
//         var_dump($response);
//         echo json_encode($response);
//     }
// }



// trait ResponseTrait {
//     private array $body;
//     private int $statusCode;

//     public function __construct(array $body, int $statusCode = 200) {
//         $this->body = $body;
//         $this->statusCode = $statusCode;
//     }

//     public function send() {
//         http_response_code($this->statusCode);
//         header("Content-type: application/json; charset=UTF-8");
//         header('Access-Control-Allow-Origin: *'); 
//         header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
//         echo json_encode($this->body);
//     }
// }
interface ResponseInterface {
    public function send();
    public function setData(array $data);
    public function getBody(): array;
    public function getMetadata(): array;
    public function getStatusCode(): int;
    public function setMessage(string $message);
    public function setStatusCode(int $statusCode);
}

trait ResponseTrait {
    private array $body;
    private int $statusCode;
    private string $message;
    private array $metadata;

    public function __construct(array $body = [], int $statusCode = 200, string $message = '', array $metadata = []) {
        $this->body = $body;
        $this->statusCode = $statusCode;
        $this->message = $message;
        $this->metadata = $metadata;
    }

    public function send() {
        http_response_code($this->statusCode);
        $response = array(
            'data' => $this->body,
            'message' => $this->message,
            'metadata' => $this->metadata
        );
        echo json_encode($response);
    }

    public function setData(array $data) {
        $this->body = $data;
    }

    public function getBody(): array {
        return $this->body;
    }

    public function getMetadata(): array {
        return $this->metadata;
    }

    public function getStatusCode(): int {
        return $this->statusCode;
    }

    public function setMessage(string $message) {
        $this->message = $message;
    }

    public function setStatusCode(int $statusCode) {
        $this->statusCode = $statusCode;
    }
}

class Response implements ResponseInterface {
    use ResponseTrait;

    public function __construct(array $body = [], int $statusCode = 200, array $metadata = [], string $message = '') {
        $this->body = $body;
        $this->statusCode = $statusCode;
        $this->metadata = $metadata;
        $this->message = $message;
    }
}

trait RouteTrait {
    private array $routes = [];

    public function addRoute(string $method, string $uri, callable $handler, DatabaseConnect $dbConnect) {
        $this->routes[] = [$method, $uri, $handler, $dbConnect];
    }

    public function handleRouteRequest(Request $request): ?Response {
        foreach ($this->routes as [$method, $uri, $handler, $dbConnect]) {
            if ($method !== $request->getMethod()) {
                continue;
            }
            $regexUri = preg_replace('/\{([\w]+)\}/', '([^/]+)', $uri);
            $regexUri = str_replace('/', '\/', $regexUri);
            if (preg_match('/^' . $regexUri . '$/', $request->getUri(), $matches)) {
                array_shift($matches);
                if ($handler instanceof Closure) {
                    $response = $handler($request);
                } else {
                    $controller = $handler[0];
                    $response = $controller->{$handler[1]}($request);
                }
                error_log("response: " . print_r($response, true));
                if ($response instanceof Response) {
                    return $response;
                }
                break;
            }
        }
        return null;
    }
}


trait MiddlewareTrait {
    private array $middleware = [];

    public function addMiddleware(callable $handler) {
        $this->middleware[] = $handler;
    }


    public function applyMiddleware($requestOrResponse, ...$middlewares) {
        foreach ($middlewares as $middleware) {
            if ($requestOrResponse instanceof Request) {
                $requestOrResponse = $middleware($requestOrResponse);
            } elseif ($requestOrResponse instanceof Response) {
                $requestOrResponse = $middleware($requestOrResponse);
            }
        }
        error_log("middle: " . print_r($requestOrResponse, true));
        return $requestOrResponse;
    }



}
?>