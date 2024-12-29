<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

// Fetch low-stock and expired items
$query = "
    SELECT ItemID, Name, Quantity, ExpiryDate
    FROM inventory
    WHERE Quantity < 50 OR ExpiryDate < NOW()";
$result = mysqli_query($conn, $query);

$inventoryReport = [];
while ($row = mysqli_fetch_assoc($result)) {
    $inventoryReport[] = $row;
}

echo json_encode($inventoryReport);
mysqli_close($conn);
?>
