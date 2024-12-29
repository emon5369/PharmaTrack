<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

// Prepare and execute the SQL query
$sql = "SELECT p.PrescriptionID, p.DateIssued, p.MedicationDetails, p.Instructions, p.status,
               u.UserID, u.Name 
        FROM prescription p
        JOIN user u ON p.UserID = u.UserID
        ORDER BY p.DateIssued DESC";

$stmt = $conn->prepare($sql);

// Execute query and fetch results
if ($stmt->execute()) {
    $result = $stmt->get_result();
    $prescriptions = [];
    
    while ($row = $result->fetch_assoc()) {
        $prescriptions[] = [
            'id' => $row['PrescriptionID'],
            'dateIssued' => $row['DateIssued'],
            'medication' => $row['MedicationDetails'],
            'instructions' => $row['Instructions'],
            'status' => $row['status'],
            'user' => [
                'id' => $row['UserID'],
                'name' => $row['Name']
            ]
        ];
    }
    
    echo json_encode(["status" => "success", "data" => $prescriptions]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
