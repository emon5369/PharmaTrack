<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

// Decode the incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Extract variables
$userID = $data['userID'] ?? '';
$medicationDetails = $data['medication'] ?? '';
$instructions = $data['instructions'] ?? '';
$dateIssued = date('Y-m-d'); // Correct format for date

// Validate required fields
if (empty($userID) || empty($medicationDetails)) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

// Prepare and execute the SQL query
$sql = "INSERT INTO prescription (DateIssued, MedicationDetails, Instructions, UserID) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Correct parameter types: `s` for string and `i` for integer
$stmt->bind_param("ssss", $dateIssued, $medicationDetails, $instructions, $userID);

// Execute and build response
if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
