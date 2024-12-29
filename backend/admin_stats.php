<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

// Fetch Total Sales
$totalSalesQuery = "SELECT SUM(TotalPrice) AS totalSales FROM sales";
$totalSalesResult = $conn->query($totalSalesQuery);
$totalSales = $totalSalesResult->fetch_assoc()['totalSales'] ?? 0;

// Fetch Low Stock Items
$lowStockQuery = "SELECT COUNT(*) AS lowStockItems FROM inventory WHERE Quantity < 50"; // Threshold: <10
$lowStockResult = $conn->query($lowStockQuery);
$lowStockItems = $lowStockResult->fetch_assoc()['lowStockItems'] ?? 0;

// Fetch Total Expenses
$totalExpensesQuery = "SELECT SUM(Amount) AS totalExpenses FROM expense";
$totalExpensesResult = $conn->query($totalExpensesQuery);
$totalExpenses = $totalExpensesResult->fetch_assoc()['totalExpenses'] ?? 0;

// Return as JSON
echo json_encode([
    "status" => "success",
    "data" => [
        "totalSales" => $totalSales,
        "lowStockItems" => $lowStockItems,
        "expenses" => $totalExpenses,
    ]
]);
?>
