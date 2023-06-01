<?php
require_once './backend/core/api_caches.php';
class RateLimiter
{
    private $rateLimit;
    private $interval;
    private $requestCount = 0;
    private $lastRequestTime = 0;

    public function __construct($rateLimit, $interval)
    {
        $this->rateLimit = $rateLimit;
        $this->interval = $interval;
    }

    public function makeRequest($url)
    {
        $this->checkRateLimit();

        try {
            $curl = curl_init();

            // Set the URL
            curl_setopt($curl, CURLOPT_URL, $url);

        
            $response = curl_exec($curl);

        
            curl_close($curl);

            $this->updateRateLimit();
            return $response;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    private function checkRateLimit()
    {
        $currentTime = time();

        if ($this->lastRequestTime > 0) {
            $elapsedTime = $currentTime - $this->lastRequestTime;

            if ($elapsedTime < $this->interval) {
                $this->requestCount++;

                if ($this->requestCount > $this->rateLimit) {
                    $response = new Response();
                    $response->setStatusCode(429); // 429 - Too Many Requests
                    $response->setMessage('Rate limit exceeded');
                    $response->send();
                    exit;
                }
            } else {
                $this->resetRateLimit();
            }
        }

        $this->lastRequestTime = $currentTime;
    }

    private function updateRateLimit()
    {
        $this->requestCount++;
    }

    private function resetRateLimit()
    {
        $this->requestCount = 1;
    }
}


?>