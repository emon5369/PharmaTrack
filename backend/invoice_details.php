<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

// Get InvoiceID from the query parameter
$invoiceID = $_GET['invoiceID']; // Change to lowercase to match the API call

$query = "
    SELECT i.InvoiceID, i.DateIssued, i.TotalAmount,
    u.Name AS CustomerName, 
           inv.Name AS ItemName, s.Quantity, s.TotalPrice
    FROM invoice i
    JOIN sales s ON i.SalesID = s.SalesID
    JOIN inventory inv ON s.InventoryID = inv.ItemID
    JOIN user u ON s.UserID = u.UserID
    WHERE i.InvoiceID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $invoiceID);
$stmt->execute();
$result = $stmt->get_result();

$invoiceDetails = [];
while ($row = $result->fetch_assoc()) {
    $invoiceDetails[] = $row;
}

echo json_encode([
    "status" => "success",
    "data" => $invoiceDetails
]);
$stmt->close();
$conn->close();
?>
