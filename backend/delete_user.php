<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

$data = json_decode(file_get_contents("php://input"), true);
$userID = $data['UserID'];

$query = "DELETE FROM user WHERE UserID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $userID);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "User deleted successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to delete user."]);
}

$stmt->close();
$conn->close();
?>
