<?php


require_once './backend/core/api_caches.php';
class RequestBodyReader
{
    public function readJsonBody()
    {
        // Read the request body
        $requestBody = file_get_contents('php://input');

        // Decode the request body if it contains JSON data
        $data = json_decode($requestBody, true);

        if ($data && isset($data['email']) && isset($data['password'])) {
            // Extract the email and password from the data
            $email = $data['email'];
            $password = $data['password'];

            return array('email' => $email, 'password' => $password);
        } else {
            return null; 
        }
    }
}
trait ValidationTrait {
    public function validateEmail($email) {
        return preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i', $email);
    }

    public function validatePassword($password) {
        return preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/', $password);
    }
}

class RequestHandler {
    private $request;
    private $bodyReader;
    use ValidationTrait;

    public function __construct() {
        $this->request = $_REQUEST;
        $this->bodyReader = new RequestBodyReader();
    }

    public function getBody() {
        $bodyData = $this->bodyReader->readJsonBody();
        if ($bodyData) {
            return $bodyData;
        }

        return $this->request;
    }

    public function getEmail() {
        // Check if email is present in the request parameters
        if (isset($this->request['email'])) {
            $email = $this->request['email'];
            if ($this->validateEmail($email)) {
                return $email;
            } else {
                $response = new Response();
                $response->setStatusCode(400);
                $response->setMessage('Invalid email');
                $response->send();
                exit;
            }
        }
    
        // Check if email is present in the JSON body
        $bodyData = $this->getBody();
        if ($bodyData && isset($bodyData['email'])) {
            $email = $bodyData['email'];
            if ($this->validateEmail($email)) {
                return $email;
            } else {
                $response = new Response();
                $response->setStatusCode(400);
                $response->setMessage('Invalid email');
                $response->send();
                exit;
            }
        }
    
        return null;
    }
    

    public function getPassword() {
        if (isset($this->request['password'])) {
            $password = $this->request['password'];
            if ($this->validatePassword($password)) {
                return $password;
            } else {
                $response = new Response();
                $response->setStatusCode(400);
                $response->setMessage('Invalid password');
                $response->send();
                exit;
            }
        }

        $bodyData = $this->getBody();
        if ($bodyData && isset($bodyData['password'])) {
            $password = $bodyData['password'];
            if ($this->validatePassword($password)) {
                return $password;
            } else {
                $response = new Response();
                $response->setStatusCode(400);
                $response->setMessage('Invalid password');
                $response->send();
                exit;
            }
        }

        return null;
    }

    public function getName() {
        // Check if name is present in the request parameters
        if (isset($this->request['name'])) {
            return $this->request['name'];
        }

        // Check if name is present in the JSON body
        $bodyData = $this->getBody();
        if ($bodyData && isset($bodyData['name'])) {
            return $bodyData['name'];
        }

        return null;
    }
}

?>