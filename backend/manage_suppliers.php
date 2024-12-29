<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

// Handle different request methods
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Retrieve all suppliers
        $sql = "SELECT SupplierID, Name, ContactInfo, ProductCatalog FROM supplier";
        $result = $conn->query($sql);
        $suppliers = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode(["status" => "success", "data" => $suppliers]);
        break;

    case 'POST':
        // Add a new supplier
        $data = json_decode(file_get_contents("php://input"), true);
        $name = $data['name'] ?? '';
        $contactInfo = $data['contactInfo'] ?? '';
        $productCatalog = $data['productCatalog'] ?? '';

        // Validate input data
        if (empty($name) || empty($contactInfo)) {
            echo json_encode(["status" => "error", "message" => "Name and contact information are required."]);
            exit;
        }

        // Prepare the SQL statement
        $sql = "INSERT INTO supplier (Name, ContactInfo, ProductCatalog) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $name, $contactInfo, $productCatalog);
        $response = $stmt->execute() ? ["status" => "success"] : ["status" => "error", "message" => $stmt->error];
        echo json_encode($response);
        break;

    case 'PUT':
        // Update an existing supplier
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? '';
        $name = $data['name'] ?? '';
        $contactInfo = $data['contactInfo'] ?? '';
        $productCatalog = $data['productCatalog'] ?? '';

        // Validate input data
        if (empty($id) || empty($name) || empty($contactInfo)) {
            echo json_encode(["status" => "error", "message" => "ID, name, and contact information are required."]);
            exit;
        }

        // Prepare the SQL statement
        $sql = "UPDATE supplier SET Name = ?, ContactInfo = ?, ProductCatalog = ? WHERE SupplierID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi", $name, $contactInfo, $productCatalog, $id);
        $response = $stmt->execute() ? ["status" => "success"] : ["status" => "error", "message" => $stmt->error];
        echo json_encode($response);

        break; // Add this break statement to prevent fall-through
    case 'DELETE':
        // Delete a supplier
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? '';

        // Validate input data
        if (empty($id)) {
            echo json_encode(["status" => "error", "message" => "ID is required."]);
            exit;
        }

        // Prepare the SQL statement
        $sql = "DELETE FROM supplier WHERE SupplierID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $response = $stmt->execute() ? ["status" => "success"] : ["status" => "error", "message" => $stmt->error];
        echo json_encode($response);
        break;
}

// Close the connection
$conn->close();
?>
