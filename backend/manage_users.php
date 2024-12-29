<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

// Handle different request methods
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Retrieve all users
        $sql = "SELECT * FROM user";
        $result = $conn->query($sql);
        $users = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode(["status" => "success", "data" => $users]);
        break;

    case 'POST':
        // Add a new user
        $data = json_decode(file_get_contents("php://input"), true);
        $name = $data['name'] ?? '';
        $email = $data['email'] ?? '';
        $password = password_hash($data['password'], PASSWORD_DEFAULT);
        $role = $data['role'] ?? 'Customer';
        $contactInfo = $data['contactInfo'] ?? '';

        // Validate input data
        if (empty($name) || empty($email) || empty($password) || empty($contactInfo)) {
            echo json_encode(["status" => "error", "message" => "All fields are required."]);
            exit;
        }

        // Prepare the SQL statement
        $sql = "INSERT INTO user (Name, Email, Password, Role, ContactInfo) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss", $name, $email, $password, $role, $contactInfo);
        $response = $stmt->execute() ? ["status" => "success"] : ["status" => "error", "message" => $stmt->error];
        echo json_encode($response);
        break;

    // Additional cases for PUT and DELETE can be added here

    default:
        echo json_encode(["status" => "error", "message" => "Method not allowed."]);
        break;
}

// Close the connection
$conn->close();
?>
