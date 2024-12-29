import Modal from "../../components/Modal";
import Sidebar from "../../components/Sidebar";
import { useState, useEffect } from "react";
import { fetchInventory } from "../../services/api";

const InventoryPage = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        batchNumber: '',
        expiryDate: '',
        quantity: '',
        price: '',
        supplierID: ''
    });

    const toggleModal = () => setModalOpen(!isModalOpen);

    useEffect(() => {
        const getInventory = async () => {
            try {
                const response = await fetchInventory();
                console.log("Fetched inventory data:", response); // Log the fetched data
                setInventory(response.data.medicines);
            } catch (error) {
                console.error("Error fetching inventory:", error);
            } finally {
                setLoading(false);
            }
        };

        getInventory();
    }, []);

    const handleEdit = (item) => {
        setFormData({
            id: item.ItemID,
            name: item.Name,
            description: item.Description,
            category: item.Category,
            batchNumber: item.BatchNumber,
            expiryDate: item.ExpiryDate,
            quantity: item.Quantity,
            price: item.Price,
            supplierID: item.SupplierID,
        });
        setIsEditing(true);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost/Pharmatrack/backend/manage_medicines.php`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id }),
                });
                const result = await response.json();
                if (result.status === "success") {
                    setInventory(inventory.filter(item => item.ItemID !== id));
                    alert("Item deleted successfully.");
                } else {
                    alert("Error deleting item: " + result.message);
                }
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };

    const handleSubmit = async () => {
        console.log("Submitting form data:", formData); // Log form data before submission
        console.log("Expiry Date:", formData.expiryDate); // Log expiry date for debugging
        const method = isEditing ? "PUT" : "POST";
        const url = `http://localhost/Pharmatrack/backend/manage_medicines.php`;
        const body = JSON.stringify(formData);

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body,
            });
            const result = await response.json();
            if (result.status === "success") {
                if (isEditing) {
                    setInventory(inventory.map(item => (item.ItemID === formData.id ? formData : item)));
                    alert("Item updated successfully.");
                } else {
                    setInventory([...inventory, { ...formData, ItemID: result.id }]);
                    alert("Item added successfully.");
                }
                const response = await fetchInventory(); // Re-fetch inventory data
                setInventory(response.data.medicines); // Update inventory state
                toggleModal(); // Close the modal after submission
                setFormData({
                    name: '',
                    description: '',
                    category: '',
                    batchNumber: '',
                    expiryDate: '',
                    quantity: '',
                    price: '',
                    supplierID: ''
                });
                setIsEditing(false);
            } else {
                alert("Error saving item: " + result.message);
            }
        } catch (error) {
            console.error("Error saving item:", error);
            if (error.response) {
                const text = await error.response.text(); // Log the response text for debugging
                console.error("Response text:", text); // Log the response text
            }
        }
    };

    return (
        <div className="flex">
            <Sidebar role="Pharmacist" />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>

                <button
                    onClick={toggleModal}
                    className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Add New Item
                </button>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="w-full bg-white border border-gray-300">
                        <thead className="text-left">
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border-b">Item Name</th>
                                <th className="px-4 py-2 border-b">Description</th>
                                <th className="px-4 py-2 border-b">Category</th>
                                <th className="px-4 py-2 border-b">Batch Number</th>
                                <th className="px-4 py-2 border-b">Expiry Date</th>
                                <th className="px-4 py-2 border-b">Quantity</th>
                                <th className="px-4 py-2 border-b">Price</th>
                                <th className="px-4 py-2 border-b">Supplier</th>
                                <th className="px-4 py-2 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map((item) => (
                                <tr key={item.ItemID}>
                                    <td className="px-4 py-2 border-b">{item.Name}</td>
                                    <td className="px-4 py-2 border-b">{item.Description}</td>
                                    <td className="px-4 py-2 border-b">{item.Category}</td>
                                    <td className="px-4 py-2 border-b">{item.BatchNumber}</td>
                                    <td className="px-4 py-2 border-b">{item.ExpiryDate}</td>
                                    <td className="px-4 py-2 border-b">{item.Quantity}</td>
                                    <td className="px-4 py-2 border-b">BDT {item.Price}</td>
                                    <td className="px-4 py-2 border-b">{item.SupplierID}</td>
                                    <td className="px-4 py-2 border-b">
                                        <div className="flex">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.ItemID)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <Modal
                    isOpen={isModalOpen}
                    onClose={toggleModal}
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Inventory Item" : "Add New Inventory Item"}</h2>
                    <input
                        type="text"
                        placeholder="Item Name"
                        className="w-full p-2 border mb-2 rounded"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className="w-full p-2 border mb-2 rounded"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        className="w-full p-2 border mb-2 rounded"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Batch Number"
                        className="w-full p-2 border mb-2 rounded"
                        value={formData.batchNumber}
                        onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                    />
                    <input
                        type="date"
                        placeholder="Expiry Date"
                        className="w-full p-2 border mb-2 rounded"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        className="w-full p-2 border mb-2 rounded"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        className="w-full p-2 border mb-2 rounded"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Supplier ID"
                        className="w-full p-2 border mb-2 rounded"
                        value={formData.supplierID}
                        onChange={(e) => setFormData({ ...formData, supplierID: e.target.value })}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default InventoryPage;
