<?php

trait SeparateUrlTrait {
    public function separateUrl($url) {
        $path = parse_url($url, PHP_URL_PATH);
        $parts = explode("/", $path);

       
        array_shift($parts);

        return $parts;
    }
}


?>