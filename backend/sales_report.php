<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');
// Fetch parameters for date range
$startDate = $_GET['startDate'];
$endDate = $_GET['endDate'];

$query = "
    SELECT s.SalesID, i.Name AS ItemName, s.Quantity, s.TotalPrice, s.Date
    FROM sales s
    JOIN inventory i ON s.InventoryID = i.ItemID
    WHERE s.Date BETWEEN ? AND ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $startDate, $endDate);
$stmt->execute();
$result = $stmt->get_result();

$salesReport = [];
while ($row = $result->fetch_assoc()) {
    $salesReport[] = $row;
}

echo json_encode($salesReport);
$stmt->close();
$conn->close();
?>
