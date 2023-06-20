<?php
require_once './backend/core/api_caches.php';

class SSG {
    private $apiEndpoint;
    private $templatePath;
    private $language;
    private $cache;

    public function __construct($apiEndpoint, $templatePath) {
        $this->apiEndpoint = $apiEndpoint;
        $this->templatePath = $templatePath;
        $this->language = '';
        $this->cache = new RedisCache(); // Replace ApiCaches with your cache implementation
    }

    public function render($route) {
        $languageAndRoute = $this->getLanguageAndRoute($route);
        $this->replaceLanguagePlaceholder($languageAndRoute['language']);
        $endpoint = array_values($this->apiEndpoint)[0];
        $endpoint = str_replace('{language}', $languageAndRoute['language'], $endpoint);

        //Generate a cache key based on the route
        // $cacheKey = md5($route);

        // // Check if the response is cached
        // $cachedResponse = $this->cache->get($cacheKey);

        // if ($cachedResponse) {
        //     // Return the cached response
        //     echo $cachedResponse;
        // } else {
            // Fetch data from the API
            $response = file_get_contents($endpoint);
            $data = json_decode($response, true);

            // Render the template
           $renderedHTML = $this->renderTemplate($this->templatePath, $data);

            // Cache the response
            // $this->cache->set($cacheKey, $renderedHTML, 600000); // Set cache expiry to 600 seconds (adjust as needed)

      
            echo $renderedHTML;
        // }
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
        
        ob_start();  
        
        include $templatePath;
        $renderedHTML = ob_get_clean();
       
        return $renderedHTML;
    }
  

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


?>
