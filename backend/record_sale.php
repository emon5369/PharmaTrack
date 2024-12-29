<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

// Get the input data
$data = json_decode(file_get_contents("php://input"), true);
$userID = $data['userID'] ?? '';
$itemID = $data['itemID'] ?? '';
$quantity = $data['quantity'] ?? '';
$totalPrice = $data['totalPrice'] ?? '';

// Validate input data
if (empty($userID) || empty($itemID) || empty($quantity)) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

$sqlCheck = "SELECT COUNT(*) FROM user WHERE userID = ?";
$checkStmt = $conn->prepare($sqlCheck);
$checkStmt->bind_param("i", $userID);
$checkStmt->execute();
$checkStmt->bind_result($count);
$checkStmt->fetch();
$checkStmt->close();

if ($count == 0) {
    echo json_encode(["status" => "error", "message" => "Invalid userID."]);
    exit;
}

// Prepare the SQL statement
$sql = "INSERT INTO sales (userID, InventoryID, Quantity, TotalPrice, Date) VALUES (?, ?, ?, ?, NOW())";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iiid", $userID, $itemID, $quantity, $totalPrice);

// Execute the statement and check for success
$response = $stmt->execute() ? ["status" => "success"] : ["status" => "error", "message" => $stmt->error];

// Get the last inserted sales ID
$salesID = $conn->insert_id; 

// Generate invoice after recording the sale
$invoiceQuery = "INSERT INTO invoice (SalesID, DateIssued, TotalAmount) VALUES (?, NOW(), ?)";
$invoiceStmt = $conn->prepare($invoiceQuery);
$invoiceStmt->bind_param("id", $salesID, $totalPrice);

// Execute the invoice statement and check for success
$invoiceResponse = $invoiceStmt->execute() ? ["status" => "success"] : ["status" => "error", "message" => $invoiceStmt->error];

// Close the statements
$invoiceStmt->close();
$stmt->close();
$conn->close();

// Return the response
echo json_encode($response);
?>
