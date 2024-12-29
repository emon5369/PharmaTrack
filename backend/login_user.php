<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

// Get the input data
$data = json_decode(file_get_contents("php://input"), true);

// Validate input data
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Check for required fields
if (empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Email and password are required."]);
    exit;
}

// Prepare the SQL statement to find the user
$sql = "SELECT userID, Name, Role, Password FROM user WHERE Email = ?"; 
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

// Check if the user exists
if ($stmt->num_rows > 0) {
$stmt->bind_result($userID, $name, $role, $hashedPassword);

$stmt->fetch();

// Verify the password
if (password_verify($password, $hashedPassword)) {
    // Successful login
    echo json_encode(["status" => "success", "message" => "Login successful.", "user" => ["userID" => $userID, "name" => $name, "role" => $role]]);
    } else {
        // Invalid password
        echo json_encode(["status" => "error", "message" => "Invalid password."]);
    }
} else {
    // User not found
    echo json_encode(["status" => "error", "message" => "User not found."]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
