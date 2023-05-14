<?php


class MatchedRoute
{
    private $name;
    private $controller;

    public function __construct($name, $controller)
    {
        $this->name = $name;
        $this->controller = $controller;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getController()
    {
        return $this->controller;
    }
}


?>