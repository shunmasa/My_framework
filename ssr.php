<?php
class SSR{
    private $routes;
    private $apiEndpoint;
    private $templatePath;
    private $language;

    public function __construct($routes, $apiEndpoint, $templatePath) {
        $this->routes = $routes;
        $this->apiEndpoint = $apiEndpoint;
        $this->templatePath = $templatePath;
        $this->language = '';
    }
   
    public function render($route) {
     
        $languageAndRoute = $this->getLanguageAndRoute($route);
        // var_dump($this->routes[$languageAndRoute['routeWithoutLanguage']] . '.php');
     
        // Check if the route exists without the language segment
        // if (isset($this->routes[$languageAndRoute['routeWithoutLanguage']])) {
        //     include 'home'. '.php';
        // } else {
        //     include '404.php';
        // }

        $this->replaceLanguagePlaceholder($languageAndRoute['language']);
        $endpoint = array_values($this->apiEndpoint)[0]; // Extract the value from the array
        $endpoint = str_replace('{language}', $languageAndRoute['language'], $endpoint);
        var_dump($this->templatePath);
        $response = file_get_contents($endpoint);
       
        // $response = file_get_contents($this->apiEndpoint);
        // $response = file_get_contents($this->apiEndpoint);
        $data = json_decode($response, true);

        // Render the template, passing the $data variable
        $renderedHTML = $this->renderTemplate($this->templatePath, $data);

        echo $renderedHTML;
    }
   
    public function setTemplatePath($templatePath) {
        $this->templatePath = $templatePath;
    }

    public function setLanguage($language) {
        $this->language = $language;
    }

    public function replaceLanguagePlaceholder($language) {
        $this->apiEndpoint = str_replace('{language}', $language, $this->apiEndpoint);
        // $this->routes = $this->replaceLanguagePlaceholderInArray($this->routes, $language);
    }

    private function renderTemplate($templatePath, $data) {
        $templatePath = ltrim($templatePath, '/');
        var_dump($templatePath);
        ob_start();
        include $templatePath;
        $renderedHTML = ob_get_clean();

        return $renderedHTML;
    }

    // public function replaceLanguagePlaceholderInArray($array, $language) {
    //     $newArray = [];
    //     foreach ($array as $key => $value) {
    //         $newKey = str_replace('{language}', $language, $key);
    //         $newValue = str_replace('{language}', $language, $value);
    //         $newArray[$newKey] = $newValue;
    //     }
    //     return $newArray;
    // }

    public function getLanguageAndRoute($route) {
        if (is_array($route)) {
            $route = implode('/', $route);
        }
    
        $segments = explode('/', $route);
        
        if (count($segments) > 1) {
            $languageSegment = $segments[0];
            // Remove any query string parameters from the language segment
            $language = explode('?', $languageSegment)[0];
    
            // Remove the language segment from the route
            $routeWithoutLanguage = end($segments);
    
            return [
                'language' => $language,
                'routeWithoutLanguage' => $routeWithoutLanguage
            ];
        }
        
        return [
            'language' => '',
            'routeWithoutLanguage' => $route
        ];
    }
    
}
// class Ssr {
//     private $routes;
//     private $apiEndpoint;
//     private $templatePath;
//     private $language;

//     public function __construct($routes, $apiEndpoint, $templatePath) {
//         $this->routes = $routes;
//         $this->apiEndpoint = $apiEndpoint;
//         $this->templatePath = $templatePath;
//         $this->language = '';
//     }

//     public function render($route) {
//         if (isset($this->routes[$route])) {
//             include $this->routes[$route] . '.php';
//         } else {
//             include '404.php';
//         }

       
 
//         $response = file_get_contents($this->apiEndpoint);
     
//         $data = json_decode($response, true);

//         // Render the template, passing the $data variable
//         $renderedHTML = $this->renderTemplate($this->templatePath, $data);

//         echo $renderedHTML;
//     }

//     public function setTemplatePath($templatePath) {
//         $this->templatePath = $templatePath;
//     }

//     public function setLanguage($language) {
//         $this->language = $language;
//     }

//     public function replaceLanguagePlaceholder($language) {
//         $this->apiEndpoint = str_replace('{language}', $language, $this->apiEndpoint);
//     }

//     private function renderTemplate($templatePath, $data) {
//         ob_start();
//         include $templatePath;
//         $renderedHTML = ob_get_clean();

//         return $renderedHTML;
//     }
//     public function replaceLanguagePlaceholderInArray($array, $language) {
//         $newArray = [];
//         foreach ($array as $key => $value) {
//             $newKey = str_replace('{language}', $language, $key);
//             $newValue = str_replace('{language}', $language, $value);
//             $newArray[$newKey] = $newValue;
//         }
//         return $newArray;
//     }

//     public function getLanguageFromRoute($route) {
//         $segments = explode('/', $route);
//         if (count($segments) > 1) {
//             $languageSegment = $segments[1];
//             // Remove any query string parameters from the language segment
//             $language = explode('?', $languageSegment)[0];
        
//             return $language;
//         }
//         return '';
//     }
// }


?>
