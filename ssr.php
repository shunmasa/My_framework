<?php
// class SSR {
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
//         $languageAndRoute = $this->getLanguageAndRoute($route);
//         $this->replaceLanguagePlaceholder($languageAndRoute['language']);
//         $endpoint = array_values($this->apiEndpoint)[0];
//         $endpoint = str_replace('{language}', $languageAndRoute['language'], $endpoint);
//         $response = file_get_contents($endpoint);
//         $data = json_decode($response, true);
//         $renderedHTML = $this->renderTemplate($this->templatePath, $data);

//         $cssFilePath = 'derekprince.css'; // Specify the path to your CSS file
//         // $preprocessedCSSFilePath = $this->preprocessCSSFile($cssFilePath);
//         $modifiedHTML = $this->modifyHTMLTemplate($renderedHTML, $cssFilePath);

//         $jsFilePath = 'derekprince.js'; // Specify the path to your JavaScript file
//         $preprocessedJSFilePath = $this->preprocessJSFile($jsFilePath);
//         $modifiedHTML = $this->modifyHTMLTemplate($modifiedHTML, $preprocessedJSFilePath);

//         echo $modifiedHTML;
//     }

//     public function setTemplatePath($templatePath) {
//         $this->templatePath = $templatePath;
//     }
//     public function setLanguage($language) {
//                 $this->language = $language;
//             }

//     public function replaceLanguagePlaceholder($language) {
//         $this->apiEndpoint = str_replace('{language}', $language, $this->apiEndpoint);
//     }

//     private function preprocessCSSFile($cssFilePath) {
//         // Read the original CSS file
//         $originalCSSContent = file_get_contents($cssFilePath);

//         // Perform your CSS manipulation logic here
//         $modifiedCSSContent = $this->manipulateCSSContent($originalCSSContent);

//         // Save the modified CSS as a temporary file
//         $preprocessedCSSFilePath = 'derekprince.css';
//         file_put_contents($preprocessedCSSFilePath, $modifiedCSSContent);

//         return $preprocessedCSSFilePath;
//     }

//     private function preprocessJSFile($jsFilePath) {
//         // Preprocess JS file logic
//         // ...
//         return $jsFilePath;
//     }

//     private function modifyHTMLTemplate($htmlTemplate, $filePath) {
//         $extension = pathinfo($filePath, PATHINFO_EXTENSION);
//         switch ($extension) {
//             case 'css':
//                 // Asynchronous loading of CSS file
//                 $htmlTemplate = preg_replace('/<\/head>/i', '<link rel="preload" as="style" href="' . $filePath . '"><link rel="stylesheet" type="text/css" href="' . $filePath . '"></head>', $htmlTemplate);
//                 break;
//             case 'js':
//                 // Asynchronous loading of JavaScript file
//                 $htmlTemplate = preg_replace('/<\/body>/i', '<script src="' . $filePath . '" async></script></body>', $htmlTemplate);
//                 break;
//             default:
//                 break;
//         }
//         return $htmlTemplate;
//     }

//     private function renderTemplate($templatePath, $data) {
      
//         $templatePath = ltrim($templatePath, '/');
//         ob_start();
//         include $templatePath;
//         $renderedHTML = ob_get_clean();
//         return $renderedHTML;
//     }

//     private function getLanguageAndRoute($route) {
//         if (is_array($route)) {
//             $route = implode('/', $route);
//         }

//         $segments = explode('/', $route);

//         if (count($segments) > 1) {
//             $languageSegment = $segments[0];
//             $language = explode('?', $languageSegment)[0];
//             $routeWithoutLanguage = end($segments);

//             return [
//                 'language' => $language,
//                 'routeWithoutLanguage' => $routeWithoutLanguage
//             ];
//         }

//         return [
//             'language' => '',
//             'routeWithoutLanguage' => $route
//         ];
//     }

//     private function manipulateCSSContent($originalCSSContent) {
//         // Perform your CSS manipulation logic here
//         // For example, you can add, remove, or modify CSS rules
//         // Return the modified CSS content
//         return $originalCSSContent;
//     }
// }


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
       
        $this->replaceLanguagePlaceholder($languageAndRoute['language']);
        $endpoint = array_values($this->apiEndpoint)[0]; // Extract the value from the array
        $endpoint = str_replace('{language}', $languageAndRoute['language'], $endpoint);
        // var_dump($this->templatePath);
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
        
        ob_start();  
        
        include $templatePath;
        $renderedHTML = ob_get_clean();
        $renderedHTML = str_replace('</head>', '<style>' . file_get_contents('derekprince.css') . '</style></head>', $renderedHTML);
        $renderedHTML = str_replace('</head>', '<style>' . file_get_contents('normalize.css') . '</style></head>', $renderedHTML);
        $renderedHTML = str_replace('</head>', '<style>' . file_get_contents('component.css') . '</style></head>', $renderedHTML);
        $renderedHTML = str_replace('</head>', '<script>' . file_get_contents('derekprince.js') . '</script></script>', $renderedHTML);
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
