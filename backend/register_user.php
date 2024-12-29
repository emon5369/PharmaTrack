<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

// Get the input data
$data = json_decode(file_get_contents("php://input"), true);

// Validate input data
$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$role = $data['role'] ?? 'Customer'; // Default role
$contactInfo = $data['contactInfo'] ?? '';

// Check for required fields
if (empty($name) || empty($email) || empty($password) || empty($contactInfo)) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

// Hash the password (using password_hash for security)
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Prepare the SQL statement
$sql = "INSERT INTO user (Name, Email, Password, Role, ContactInfo) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $name, $email, $hashedPassword, $role, $contactInfo);

// Execute the statement and check for success
$response = $stmt->execute() ? ["status" => "success"] : ["status" => "error", "message" => $stmt->error];

// Close the statement and connection
$stmt->close();
$conn->close();

// Return the response
echo json_encode($response);
?>
