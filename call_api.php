<?php

require_once './backend/helper/loadEnv.php';
require_once './vendor/autoload.php';

class ApiCaller {
    private $baseUrl;

    public function __construct($baseUrl) {
      

        $this->baseUrl = $baseUrl;
    }

    public function callApi() {
        $apiUrl = $this->baseUrl . '/text.php';

        $apiResponse = file_get_contents($apiUrl,false);

        if ($apiResponse) {
            $data = json_decode($apiResponse);
            print_r($data);
        } else {
            http_response_code(404);
        }
    }
}

$loader = new LoadEnvVariables();
$loader->loadEnvVariables();

$url = getenv('BASE_URL');
error_log("....: " . print_r($url, true));
$apiCaller = new ApiCaller($url.'/dpm_0.1/text');
$apiCaller->callApi();


?>