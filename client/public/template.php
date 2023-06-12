<?php

class TemplateEngine
{
    protected $templateDir;
    protected $data;

    public function __construct($templateDir)
    {
        $this->templateDir = $templateDir;
        $this->data = [];
    }

    public function render($templateName)
    {
        $templateFile = $this->templateDir . '/' . $templateName;

        if (!file_exists($templateFile)) {
            throw new Exception("Template file '{$templateFile}' not found.");
        }

        ob_start();
        extract($this->data);
        include $templateFile;
        return ob_get_clean();
    }

    public function addData($key, $value)
    {
        $this->data[$key] = $value;
    }
}


?>