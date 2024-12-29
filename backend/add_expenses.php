<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');;

// Get expense details from the request body
$data = json_decode(file_get_contents("php://input"), true);

$category = $data['Category'];
$description = $data['Description'];
$amount = $data['Amount'];
$date = $data['Date'];

$query = "INSERT INTO expense (Category, Description, Amount, Date) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssis", $category, $description, $amount, $date);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Expense added successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to add expense."]);
}

$stmt->close();
$conn->close();
?>
