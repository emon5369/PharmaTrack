<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

// Handle different request methods
$requestMethod = $_SERVER["REQUEST_METHOD"];
$data = json_decode(file_get_contents("php://input"), true);

switch ($requestMethod) {
    case 'POST':
        $name = $data['name'];
        $description = $data['description'];
        $category = $data['category'];
        $batchNumber = $data['batchNumber'];
        $addedDate = date('Y-m-d'); // Current date
        $expiryDate = $data['expiryDate'] ?? null; // Allow null for debugging
        error_log("Received expiry date before SQL execution: " . $expiryDate); // Log expiry date before SQL execution
        error_log("Received expiry date: " . $expiryDate); // Debug expiry date
        $quantity = $data['quantity'];
        $price = $data['price'];
        $supplierID = $data['supplierID'];
    
        $sql = "INSERT INTO inventory (Name, Description, Category, BatchNumber, AddedDate, ExpiryDate, Quantity, Price, SupplierID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            error_log("Prepare statement failed: " . $conn->error);
        }
        $stmt->bind_param("sssssissd", $name, $description, $category, $batchNumber, $addedDate, $expiryDate, $quantity, $price, $supplierID);
    
        if ($stmt->execute()) {
            $response = ["status" => "success", "id" => $conn->insert_id];
        } else {
            $response = ["status" => "error", "message" => $stmt->error];
        }
        break;
    

    case 'GET':
        // Retrieve all medicines
        $sql = "SELECT * FROM inventory";
        $res = $conn->query($sql);
        $medicines = [];
        while ($row = $res->fetch_assoc()) {
            $medicines[] = $row;
        }
        $response = ["status" => "success", "medicines" => $medicines];
        break;

    case 'PUT':
        // Update medicine details
        $id = $data['id'];
        $name = $data['name'];
        $description = $data['description'];
        $category = $data['category'];
        $batchNumber = $data['batchNumber'];
        $expiryDate = $data['expiryDate'];
        $quantity = $data['quantity'];
        $price = $data['price'];
        $supplierID = $data['supplierID'];

        $sql = "UPDATE inventory SET Name=?, Description=?, Category=?, BatchNumber=?, ExpiryDate=?, Quantity=?, Price=?, SupplierID=? WHERE ItemID=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssissi", $name, $description, $category, $batchNumber, $expiryDate, $quantity, $price, $supplierID, $id);
        $response = $stmt->execute() ? ["status" => "success"] : ["status" => "error", "message" => $stmt->error];
        break;

    case 'DELETE':
        // Delete a medicine
        $id = $data['id'];
        $sql = "DELETE FROM inventory WHERE ItemID=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $response = $stmt->execute() ? ["status" => "success"] : ["status" => "error", "message" => $stmt->error];
        break;

    default:
        $response = ["status" => "error", "message" => "Invalid request method"];
        break;
}

if (isset($stmt)) {
    $stmt->close();
}
$conn->close();
echo json_encode($response);
?>
