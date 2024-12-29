<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

// Get the input data
$data = json_decode(file_get_contents("php://input"), true);
$customerID = $data['customerID'] ?? '';
$itemID = $data['itemID'] ?? '';
$quantity = $data['quantity'] ?? '';

// Validate input data
if (empty($customerID) || empty($itemID) || empty($quantity)) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

// Prepare the SQL statement
$sql = "INSERT INTO sales (CustomerID, InventoryID, Quantity, TotalPrice, Date) VALUES (?, ?, ?, ?, NOW())";
$stmt = $conn->prepare($sql);
$totalPrice = $quantity * 9.99; // Assuming a fixed price for simplicity
$stmt->bind_param("iiid", $customerID, $itemID, $quantity, $totalPrice);

// Execute the statement and check for success
$response = $stmt->execute() ? ["status" => "success"] : ["status" => "error", "message" => $stmt->error];

// Close the statement and connection
$stmt->close();
$conn->close();

// Return the response
echo json_encode($response);
?>
