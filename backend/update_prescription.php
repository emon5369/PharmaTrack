<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

$data = json_decode(file_get_contents("php://input"), true);
$prescriptionID = $data['prescriptionID'];
$status = $data['status'];

$query = "UPDATE prescription SET status = ? WHERE PrescriptionID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("si", $status, $prescriptionID);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Prescription updated successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update prescription."]);
}

$stmt->close();
$conn->close();
?>
