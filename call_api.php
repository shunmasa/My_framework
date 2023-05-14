<?php


class ApiCaller {
    private $baseUrl;

    public function __construct($baseUrl) {
        $this->baseUrl = $baseUrl;
    }

    public function callApi() {
        $apiUrl = $this->baseUrl . '/text.php';
        $apiResponse = file_get_contents($apiUrl);

        if ($apiResponse) {
            $data = json_decode($apiResponse);
            print_r($data);
        } else {
            echo "Error calling API";
        }
    }
}

// Create an instance of the ApiCaller class and make the API call
$apiCaller = new ApiCaller('http://127.0.0.1:8080/dpm_0.1/backend/api');
$apiCaller->callApi();


?>