<?php
require_once './template.php';

trait RouteTrait
{
    private $routes;

    public function __construct($routes)
    {
        $this->routes = $routes;
    }

    public function matchRoute($currentUrl)
    {
        foreach ($this->routes as $route => $config) {
            $routePattern = $this->prepareRoutePattern($route);

            if (preg_match($routePattern, $currentUrl, $matches)) {
                $routeConfig = $config;
                $routeParams = $this->extractRouteParams($route, $matches);

                return [$routeConfig, $routeParams];
            }
        }

        return null;
    }

    private function prepareRoutePattern($route)
    {
        $routePattern = str_replace('/', '\/', $route);
        $routePattern = preg_replace('/\{[a-zA-Z]+\}/', '[a-zA-Z0-9\-]+', $routePattern);
        $routePattern = '/^' . $routePattern . '$/';

        return $routePattern;
    }

    private function extractRouteParams($route, $matches)
    {
        $routeParams = [];

        preg_match_all('/\{([a-zA-Z]+)\}/', $route, $paramMatches);
        foreach ($paramMatches[1] as $index => $paramName) {
            $routeParams[$paramName] = $matches[$index + 1];
        }

        return $routeParams;
    }
}

class ApiRequester
{
    public static function makeApiRequest($apiEndpoint)
    {
        // Create a new cURL resource
        $curl = curl_init();

        // Set the cURL options
        curl_setopt_array($curl, [
            CURLOPT_URL => $apiEndpoint,
            CURLOPT_RETURNTRANSFER => true,
            // Add any other necessary options, such as headers, authentication, etc.
        ]);

        // Send the request and retrieve the response
        $apiResponse = curl_exec($curl);

        // Check for any cURL errors
        if (curl_errno($curl)) {
            // Handle the error, throw an exception, or return an error response
            $error = curl_error($curl);
            throw new Exception("API request failed: $error");
        }

        // Close the cURL resource
        curl_close($curl);

        // Return the API response
        return $apiResponse;
    }

    public static function extractDataFromApiResponse($apiResponse)
    {
        // Decode the JSON response
        $responseData = json_decode($apiResponse, true);

        // Check if the JSON decoding was successful
        if ($responseData === null) {
            // Handle the error, throw an exception, or return an error response
            throw new Exception("Failed to decode API response: " . json_last_error_msg());
        }

        // Extract the required data from the response
        $extractedData = [
            'data' => $responseData['data'],
            // Add any other required data extraction logic based on the API response structure
        ];

        return $extractedData;
    }
}

class Router
{
    use RouteTrait;

    private $templateEngine;
    private $templateDir;

    public function __construct($routes, $templateDir)
    {
        $this->routes = $routes;
        $this->templateDir = $templateDir;
        $this->templateEngine = new TemplateEngine($templateDir);
    }

    public function handleRequest()
    {
        $currentUrl = $_SERVER['REQUEST_URI'];

        $matchedRoute = $this->matchRoute($currentUrl);

        if ($matchedRoute) {
            list($routeConfig, $routeParams) = $matchedRoute;

            $template = $routeConfig['template'];
            $data = $routeConfig['data'];

            $data = array_merge($data, $routeParams);

            if (isset($routeParams['id']) && isset($data['endpoint'])) {
                $endpoint = $this->appendIdToEndpoint($data['endpoint'], $routeParams['id']);
                $apiResponse = ApiRequester::makeApiRequest($endpoint);
                $apiData = ApiRequester::extractDataFromApiResponse($apiResponse);
                $data = array_merge($data, $apiData);
            }

            $templatePath = $this->templateDir . '/' . $template;

            foreach ($data as $key => $value) {
                $this->templateEngine->addData($key, $value);
            }

            $html = $this->templateEngine->render($templatePath);

            echo $html;
        } else {
            // Handle 404 - Page not found
            echo '404 - Page not found';
        }
    }

    private function appendIdToEndpoint($endpoint, $id)
    {
        return rtrim($endpoint, '/') . '/' . $id;
    }
}

// $templateDir = 'path/to/templates';
$templateDir = __DIR__ . '/templates';

$routes = [
    '/' => [
        'template' => 'home.php',
        'data' => [
            'showContent' => true,
            'message' => 'Welcome to the homepage!',
        ],
    ],
    '/about' => [
        'template' => 'about.php',
        'data' => [
            'showContent' => false,
            'message' => 'This is the about page.',
        ],
    ],
    '/contact' => [
        'template' => 'contact.php',
        'data' => [
            'showContent' => true,
            'message' => 'Get in touch with us!',
        ],
    ],
    '/{language}/teaching' => [
        'template' => 'teaching.php',
        'data' => [
            'showContent' => true,
            'endpoint' => 'http://localhost:8080/dpm_0.1/{language}/teaching/',
        ],
    ],

    '/teaching/{id}' => [
        'template' => 'teaching-details.php',
        'data' => [
            'showContent' => true,
            'endpoint' => 'https://api.example.com/teaching-details',
        ],
    ],
];

$router = new Router($routes, $templateDir);
$router->handleRequest();


?>