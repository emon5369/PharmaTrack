<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

// Get the item ID from the query parameters
$itemID = $_GET['itemID'] ?? '';

// Validate input data
if (empty($itemID)) {
    echo json_encode(["status" => "error", "message" => "Item ID is required."]);
    exit;
}

// Prepare the SQL statement
$sql = "SELECT Quantity FROM inventory WHERE ItemID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $itemID);
$stmt->execute();
$result = $stmt->get_result();
$stock = $result->fetch_assoc();

// Close the statement and connection
$stmt->close();
$conn->close();

// Return the response
if ($stock) {
    echo json_encode(["status" => "success", "quantity" => $stock['Quantity']]);
} else {
    echo json_encode(["status" => "error", "message" => "Item not found."]);
}
?>
