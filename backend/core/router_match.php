<?php

class RouterMatch
{
    private $routes = [];

    public function addRoute(string $path, $controller)
    {
        $this->routes[] = ['path' => $path, 'controller' => $controller];
    }


    public function matchRequest(Request $request)
    {
        $pathInfo = $request->getPathInfo();

        foreach ($this->routes as $route) {
            $pattern = $this->convertRouteToRegex($route['path']);
            if (preg_match($pattern, $pathInfo, $matches)) {
                return new MatchedRoute($route['controller'], $matches);
            }
        }

        throw new ResourceNotFoundException();
    }

    private function convertRouteToRegex(string $route)
    {
        // Escape forward slashes and convert route parameters to regex groups
        $pattern = preg_replace_callback('#\{(\w+)\}#', function ($matches) {
            return '(?P<' . $matches[1] . '>[^/]+)';
        }, preg_quote($route, '#'));

        // Add start and end delimiters, and make trailing slash optional
        $pattern = '#^' . $pattern . '/?$#';

        return $pattern;
    }
}


?>