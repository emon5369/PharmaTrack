<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

// Validate the logged-in user ID (e.g., passed via GET parameter, session, or token)
if (!isset($_GET['userID'])) {
    echo json_encode([
        "status" => "error",
        "message" => "User ID is required."
    ]);
    exit();
}

$userID = intval($_GET['userID']); // Sanitize the userID input

// Retrieve invoice data for the specific user
$salesQuery = "
    SELECT i.InvoiceID, i.DateIssued, i.TotalAmount 
    FROM invoice i
    JOIN sales s ON i.SalesID = s.SalesID
    WHERE s.UserID = ?";
$salesStmt = $conn->prepare($salesQuery);
$salesStmt->bind_param("i", $userID);
$salesStmt->execute();
$salesStmt->bind_result($invoiceID, $dateIssued, $totalAmount);

$invoices = [];
while ($salesStmt->fetch()) {
    $invoices[] = [
        "invoiceID" => $invoiceID,
        "dateIssued" => $dateIssued,
        "totalAmount" => $totalAmount
    ];
}
$salesStmt->close();

// Return the response
echo json_encode([
    "status" => "success",
    "data" => $invoices
]);
?>
