<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

$data = json_decode(file_get_contents("php://input"), true);
$role = $data['Role'];
$name = $data['Name'];
$email = $data['Email'];
$password = password_hash($data['Password'], PASSWORD_DEFAULT);
$contactInfo = $data['ContactInfo'];

$query = "INSERT INTO user (Role, Name, Email, Password, ContactInfo) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("sssss", $role, $name, $email, $password, $contactInfo);

if ($stmt->execute()) {
    $lastId = $conn->insert_id; // Get the last inserted user ID
    $query = "SELECT * FROM user WHERE UserID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $lastId);
    $stmt->execute();
    $result = $stmt->get_result();
    $newUser = $result->fetch_assoc(); // Fetch the new user details

    echo json_encode(["success" => true, "message" => "User added successfully.", "newUser" => $newUser]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to add user."]);
}

$stmt->close();
$conn->close();
?>
