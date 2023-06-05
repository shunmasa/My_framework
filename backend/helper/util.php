<?php

trait UrlSeparationTrait {
    protected function separateUrl(string $url): array {
        $urlParts = explode('/', trim($url, '/'));
        return $urlParts;
    }

    public function getBase(string $endpoint): string {
        $urlParts = $this->separateUrl($endpoint);
        return isset($urlParts[1]) ? '/' . $urlParts[1] : '';
    }

    public function getLanguage(string $endpoint): string {
        $urlParts = $this->separateUrl($endpoint);
        return isset($urlParts[0]) ? $urlParts[0] : '';
    }

    public function getSlug(string $endpoint): string {
        $urlParts = $this->separateUrl($endpoint);
        return isset($urlParts[2]) ? $urlParts[2] : '';
    }
    public function getCollection(string $endpoint): string {
        $urlParts = $this->separateUrl($endpoint);
        return isset($urlParts[0]) ?  "/" . $urlParts[0] : '';
    }
    public function getCategoryId(string $endpoint): string {
        $urlParts = $this->separateUrl($endpoint);
        if ($this->getCollection($endpoint) == '/collections') {
            return isset($urlParts[1]) ? $urlParts[1] : '';;
        } else {
            throw new Exception("Invalid endpoint for getting collection ID");
        }
    }
}

?>