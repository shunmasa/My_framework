<?php

// class HttpCall {
//     public function get(string $url): HttpResponse {
//         // Make the request and get the response
//         $responseBody = file_get_contents($url);

//         if ($responseBody === false) {
//             // Error handling
//             throw new \Exception('Error occurred during HTTP request');
//         }

//         return new HttpResponse($responseBody);
//     }
// }

// class HttpResponse {
//     private $body;

//     public function __construct(string $body) {
//         $this->body = $body;
//     }

//     public function getBody(): string {
//         return $this->body;
//     }
// }

// class SSR {
//     private $httpCall;

//     public function __construct(HttpCall $httpCall) {
//         $this->httpCall = $httpCall;
//     }

//     public function renderPage(string $url, string $templateName, array $data = []): string {
//         try {
//             $response = $this->httpCall->get($url);
//             $responseBody = $response->getBody();

//             $html = $this->renderTemplate($templateName,$responseBody,$data);

//             return $html;
//         } catch (\Exception $e) {
//             // Handle any errors that occurred during rendering
//             throw new \Exception('Error occurred during SSR rendering: ' . $e->getMessage());
//         }
//     }

//     public function renderTemplate(string $templateName, string $responseBody, array $data = []): string {
//         $templatePath = './public/' . $templateName . '.html';
//         if (file_exists($templatePath)) {
//             ob_start(); // Start output buffering
//             include $templatePath; // Include the template file
//             $renderedHTML = ob_get_clean(); // Get the buffered output and clean the buffer

//             // Add JavaScript code for hydration
//             $renderedHTML .= <<<JS
//             <script>
//             document.addEventListener('DOMContentLoaded', function() {
                
//                 const newsContainer = document.getElementById('news_container');   
               
//                 const titleElement = document.getElementById('news_title');
//                 titleElement.textContent = hydratedData.title;
//             });
//             </script>
//         JS;

//             return $renderedHTML;
//         } else {
//             throw new Exception('Template file not found.');
//         }
//     }
// }


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

    public function handle(Request $request): Response {
        try {
        $response = $this->handleRouteRequest($request);
        if (!$response) {
            throw new ResourceNotFoundException();
        }
        $response = $this->applyMiddleware($response, ...$this->middleware);
       
        return $response;
    } catch (Exception $exception) {
        return $this->errorHandler->handleException($exception);
    }
    }
}

class Request {
    private string $method;
    private string $uri;
    private array $params;

    public function __construct(string $method, string $uri, array $params = []) {
        $this->method = $method;
        $this->uri = $uri;
        $this->params = $params;
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
}

interface ResponseInterface {
    public function setData(array $data);
    public function getStatusCode(): int;
    public function send();

 }

 class Response implements ResponseInterface {
    use ResponseTrait, MetadataTrait;

    private array $metadata;
    private array $body;
    private int $statusCode;

    public function __construct(array $body, int $statusCode = 200, array $metadata = []) {
        $this->body = $body;
        $this->statusCode = $statusCode;
        $this->metadata = $metadata;
    }

    public function getBody(): array {
        return $this->body;
    }
    public function setData(array $data) {
        $this->body = $data;
    }

    public function getMetadata(): array {
        return $this->metadata;
    }

    public function getStatusCode(): int {
        return $this->statusCode;
    }

    public function send() {
        http_response_code($this->statusCode);
     
        $response = array(
            'data' => $this->body,
            'metadata' => $this->metadata
        );
        var_dump($response);
        echo json_encode($response);
    }
}


trait ResponseTrait {
    private array $body;
    private int $statusCode;

    public function __construct(array $body, int $statusCode = 200) {
        $this->body = $body;
        $this->statusCode = $statusCode;
    }

    public function send() {
        http_response_code($this->statusCode);
        header("Content-type: application/json; charset=UTF-8");
        header('Access-Control-Allow-Origin: *'); 
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        echo json_encode($this->body);
    }
}


// class Response implements ResponseInterface {
//     use ResponseTrait, MetadataTrait;

//     private array $metadata;

//     public function __construct(string $body, int $statusCode = 200, array $metadata = []) {
//         $this->body = $body;
//         $this->statusCode = $statusCode;
//         $this->metadata = $metadata;
//     }

//     public function getBody(): string {
//         return $this->body;
//     }

//     public function getMetadata(): array {
//         return $this->metadata;
//     }

//     public function getStatusCode(): int {
//         return $this->statusCode;
//     }

//     public function send() {
//         http_response_code($this->statusCode);
//         header("Content-type: application/json; charset=UTF-8");
//         header('Access-Control-Allow-Origin: *');
//         header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

//         $response = array(
//             'data' => $this->body,
//             'metadata' => $this->metadata
//         );

//         echo json_encode($response);
//     }
// }

// trait ResponseTrait {
//     private string $body;
//     private int $statusCode;

//     public function __construct(string $body, int $statusCode = 200) {
//         $this->body = $body;
//         $this->statusCode = $statusCode;
//     }

//     public function send() {
//         http_response_code($this->statusCode);
//         // header('Content-Type: application/json');
//         header("Content-type: application/json; charset=UTF-8");
//         header('Access-Control-Allow-Origin: *'); 
//         header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
//         echo json_encode($this->body);
//     }
// }

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

// public function handleRouteRequest(Request $request): ?Response {
//     foreach ($this->routes as [$method, $uri, $handler, $dbConnect]) {
//         if ($method !== $request->getMethod()) {
//             continue;
//         }
//         $regexUri = preg_replace('/\{([\w]+)\}/', '([^/]+)', $uri);
//         $regexUri = str_replace('/', '\/', $regexUri);
//         if (preg_match('/^' . $regexUri . '$/', $request->getUri(), $matches)) {
//             array_shift($matches);
//             if ($handler instanceof Closure) {
//                 $response = $handler($request);
//             } else {
//                 $controller = $handler[0];
//                 $response = $controller->{$handler[1]}($request);
//             }
//             error_log("response: " . print_r($response, true));
//             if ($response instanceof Response) {
//                 return $response;
//             }
//             break;
//         }
//     }
//     return null;
// }

// }
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