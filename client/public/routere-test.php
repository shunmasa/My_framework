<?php
require_once './template.php';
$routes = [
    '/' => [
        'template' => 'home.twig.php',
        'data' => [
            'showContent' => true,
            'message' => 'Welcome to the homepage!',
        ],
    ],
    '/about' => [
        'template' => 'about.twig.php',
        'data' => [
            'showContent' => false,
            'message' => 'This is the about page.',
        ],
    ],
    '/contact' => [
        'template' => 'contact.twig.php',
        'data' => [
            'showContent' => true,
            'message' => 'Get in touch with us!',
        ],
    ],
    '/teaching' => [
        'template' => 'teaching.twig.php',
        'data' => [
            'showContent' => true,
            'endpoint' => 'https://api.example.com/teaching',
        ],
    ],
    '/teaching/{id}/edit' => [
        'template' => 'teaching-edit.twig.php',
        'data' => [
            'showContent' => true,
            'endpoint' => 'https://api.example.com/teaching-edit',
        ],
    ],
    '/teaching/{id}' => [
        'template' => 'teaching-details.twig.php',
        'data' => [
            'showContent' => true,
            'endpoint' => 'https://api.example.com/teaching-details',
        ],
    ],
];


// Parse the current URL
$currentUrl = $_SERVER['REQUEST_URI'];

// Match the route
foreach ($routes as $route => $config) {
    // Replace route parameters with regex patterns
    $routePattern = str_replace('/', '\/', $route);
    $routePattern = preg_replace('/\{[a-zA-Z]+\}/', '[a-zA-Z0-9\-]+', $routePattern);
    $routePattern = '/^' . $routePattern . '$/';

    // Check if the current URL matches the route pattern
    if (preg_match($routePattern, $currentUrl, $matches)) {
        $routeConfig = $config;
        $routeParams = [];

        // Extract route parameters from the URL
        preg_match_all('/\{([a-zA-Z]+)\}/', $route, $paramMatches);
        foreach ($paramMatches[1] as $index => $paramName) {
            $routeParams[$paramName] = $matches[$index + 1];
        }

        break;
    }
}

// If a route is matched
if (isset($routeConfig)) {
    // Extract the template and data from the route
    $template = $routeConfig['template'];
    $data = $routeConfig['data'];

    // Merge route parameters into the data
    $data = array_merge($data, $routeParams);

    // Check if the endpoint requires an ID
    if (isset($routeParams['id']) && isset($data['endpoint'])) {
        // Append the ID to the endpoint URL
        $endpoint = $data['endpoint'] . '/' . $routeParams['id'];

        // Make the API request using the updated endpoint
        $apiResponse = makeApiRequest($endpoint);

        // Extract data from the API response
        $apiData = extractDataFromApiResponse($apiResponse);

        // Merge the API data with the existing data
        $data = array_merge($data, $apiData);
    }

    // Render the template with the data
    $templateDir = 'path/to/templates';
    $templatePath = $templateDir . '/' . $template;
    $templateEngine = new TemplateEngine($templateDir);

    foreach ($data as $key => $value) {
        $templateEngine->addData($key, $value);
    }

    $html = $templateEngine->render($templatePath);

    echo $html;
} else {
    // Handle 404 - Page not found
    echo '404 - Page not found';
}



function makeApiRequest($apiEndpoint) {
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

function extractDataFromApiResponse($apiResponse) {
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



?>