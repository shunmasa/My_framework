<?php


class View
{
    private string $viewPath;
    private array $data = [];

    public function __construct(string $viewPath)
    {
        $this->viewPath = $viewPath;
    }

    public function with(string $key, $value): self
    {
        $this->data[$key] = $value;
        return $this;
    }

    public function render(): string
    {
        extract($this->data);
        ob_start();
        include $this->viewPath;
        return ob_get_clean();
    }
}

?>