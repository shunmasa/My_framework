<?php
class ResourceNotFoundException extends Exception {}
class Router {
    use RouteTrait;
    use MiddlewareTrait;

    public function handle(Request $request): Response {
        $response = $this->handleRouteRequest($request);
        if (!$response) {
            throw new ResourceNotFoundException();
        }
        $response = $this->applyMiddleware($response, ...$this->middleware);
       
        return $response;
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
    public function send();
}

class Response implements ResponseInterface {
    use ResponseTrait;

    public function getBody(): string {
        return $this->body;
    }
}

trait ResponseTrait {
    private string $body;
    private int $statusCode;

    public function __construct(string $body, int $statusCode = 200) {
        $this->body = $body;
        $this->statusCode = $statusCode;
    }

    public function send() {
        http_response_code($this->statusCode);
        header('Content-Type: application/json');
        echo json_encode($this->body);
    }
}

trait RouteTrait {
    private array $routes = [];

    public function addRoute(string $method, string $uri, callable $handler, DatabaseConnect $dbConnect) {
        $this->routes[] = [$method, $uri, $handler, $dbConnect];
    }

//     public function handleRouteRequest(Request $request): ?Response {
//         foreach ($this->routes as [$method, $uri, $handler, $dbConnect]) {
//             if ($method !== $request->getMethod()) {
//                 continue;
//             }
//             $regexUri = preg_replace('/\{([\w]+)\}/', '([^/]+)', $uri);
//             $regexUri = str_replace('/', '\/', $regexUri);
//             if (preg_match('/^' . $regexUri . '$/', $request->getUri(), $matches)) {
//                 array_shift($matches);
//                 $controller = new $handler($dbConnect);
//                 $response = $controller($request);
//                 if ($response instanceof Response) {
//                     return $response;
//                 }
//                 break;
//             }
//         }
//         return null;
//     }
// }
public function handleRouteRequest(Request $request): ?Response {
    foreach ($this->routes as [$method, $uri, $handler, $dbConnect]) {
        if ($method !== $request->getMethod()) {
            continue;
        }
        $regexUri = preg_replace('/\{([\w]+)\}/', '([^/]+)', $uri);
        $regexUri = str_replace('/', '\/', $regexUri);
        if (preg_match('/^' . $regexUri . '$/', $request->getUri(), $matches)) {
            array_shift($matches);
            $controller = $handler[0];
            $response = $controller->{$handler[1]}($request);
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
        // error_log("middle: " . print_r($requestOrResponse, true));
        return $requestOrResponse;
    }


    // public function applyMiddleware(Request|Response $request): Request|Response {
    //     foreach ($this->middleware as $handler) {
    //         if ($request instanceof Request) {
    //             $response = $handler($request);
    //             if ($response instanceof Response) {
    //                 return $response;
    //             }
    //             $request = $response;
    //         } elseif ($request instanceof Response) {
          
    //             error_log("comment: " . print_r($request, true));
    //             $request = $handler($request);
               
    //         }
    //     }
    //     return $request;
    // }
}
?>