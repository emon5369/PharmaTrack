import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { getSuppliers, addSupplier, updateSupplier, deleteSupplier } from "../../services/api";

const ManageSuppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newSupplier, setNewSupplier] = useState({
        name: "",
        contactInfo: "",
        productCatalog: "",
    });
    const [editingSupplier, setEditingSupplier] = useState(null);

    const fetchSuppliers = async () => {
        try {
            const response = await getSuppliers();
            console.log(response);
            if (response.status === "success") {
                setSuppliers(response.data);
            } else {
                alert("Failed to fetch suppliers.");
            }
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const handleAddSupplier = async (e) => {
        e.preventDefault();
        try {
            const response = await addSupplier(newSupplier);
            if (response.status === "success") {
                alert("Supplier added successfully!");
                await fetchSuppliers(); // Refresh the supplier list
                setNewSupplier({ name: "", contactInfo: "", productCatalog: "" });
            } else {
                alert(response.message || "Failed to add supplier.");
            }
        } catch (error) {
            console.error("Error adding supplier:", error);
        }
    };

    const handleEditSupplier = (supplier) => {
        setEditingSupplier({
            id: supplier.SupplierID, // Backend expects "id"
            name: supplier.Name,
            contactInfo: supplier.ContactInfo,
            productCatalog: supplier.ProductCatalog,
        });
    };

    const handleUpdateSupplier = async (e) => {
        e.preventDefault();
        if (!editingSupplier.id || !editingSupplier.name || !editingSupplier.contactInfo) {
            alert("ID, name, and contact information are required.");
            return;
        }

        try {
            const response = await updateSupplier(editingSupplier); // Sends "id" as expected by the backend
            if (response.status === "success") {
                alert("Supplier updated successfully!");
                await fetchSuppliers(); // Refresh the supplier list
                setEditingSupplier(null);
            } else {
                console.log(response);
                alert(response.message || "Failed to update supplier.");
            }
        } catch (error) {
            console.error("Error updating supplier:", error);
        }
    };

    const handleDeleteSupplier = async (supplierID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");
        if (confirmDelete) {
            try {
                const response = await deleteSupplier(supplierID);
                if (response.status === "success") {
                    alert("Supplier deleted successfully!");
                    setSuppliers(suppliers.filter(s => s.SupplierID !== supplierID));
                } else {
                    console.log(response);
                    alert(response.message || "Failed to delete supplier.");
                }
            } catch (error) {
                console.error("Error deleting supplier:", error);
            }
        }
    };

    return (
        <div className="flex">
            <Sidebar role="Admin" />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Manage Suppliers</h1>

                {/* Add Supplier Form */}
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-bold mb-4">
                        {editingSupplier ? "Edit Supplier" : "Add New Supplier"}
                    </h2>
                    <form
                        onSubmit={
                            editingSupplier
                                ? handleUpdateSupplier
                                : handleAddSupplier
                        }
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700">Name:</label>
                            <input
                                type="text"
                                value={
                                    editingSupplier
                                        ? editingSupplier.name
                                        : newSupplier.name
                                }
                                onChange={(e) =>
                                    editingSupplier
                                        ? setEditingSupplier({
                                            ...editingSupplier,
                                            name: e.target.value,
                                        })
                                        : setNewSupplier({
                                            ...newSupplier,
                                            name: e.target.value,
                                        })
                                }
                                className="w-full p-2 border rounded"
                                placeholder="Enter supplier name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Contact Info:
                            </label>
                            <input
                                type="text"
                                value={
                                    editingSupplier
                                        ? editingSupplier.contactInfo
                                        : newSupplier.contactInfo
                                }
                                onChange={(e) =>
                                    editingSupplier
                                        ? setEditingSupplier({
                                            ...editingSupplier,
                                            contactInfo: e.target.value,
                                        })
                                        : setNewSupplier({
                                            ...newSupplier,
                                            contactInfo: e.target.value,
                                        })
                                }
                                className="w-full p-2 border rounded"
                                placeholder="Enter contact info"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Product Catalog:
                            </label>
                            <textarea
                                value={
                                    editingSupplier
                                        ? editingSupplier.productCatalog
                                        : newSupplier.productCatalog
                                }
                                onChange={(e) =>
                                    editingSupplier
                                        ? setEditingSupplier({
                                            ...editingSupplier,
                                            productCatalog: e.target.value,
                                        })
                                        : setNewSupplier({
                                            ...newSupplier,
                                            productCatalog: e.target.value,
                                        })
                                }
                                className="w-full p-2 border rounded"
                                placeholder="Enter product catalog details"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            {editingSupplier ? "Update Supplier" : "Add Supplier"}
                        </button>
                        {editingSupplier && (
                            <button
                                type="button"
                                onClick={() => setEditingSupplier(null)}
                                className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                </div>

                {/* Supplier List */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Supplier List</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <table className="w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 border-b">Name</th>
                                    <th className="px-4 py-2 border-b">
                                        Contact Info
                                    </th>
                                    <th className="px-4 py-2 border-b">
                                        Product Catalog
                                    </th>
                                    <th className="px-4 py-2 border-b">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {suppliers.map((supplier) => (
                                    <tr key={supplier.SupplierID}>
                                        <td className="px-4 py-2 border-b">{supplier.Name}</td>
                                        <td className="px-4 py-2 border-b">{supplier.ContactInfo}</td>
                                        <td className="px-4 py-2 border-b">{supplier.ProductCatalog || "N/A"}</td>
                                        <td className="px-4 py-2 border-b">
                                            <div className="flex">
                                                <button
                                                    onClick={() => handleEditSupplier(supplier)}
                                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteSupplier(supplier.SupplierID)}
                                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 ml-2"
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
                </div>
            </div>
        </div>
    );
};

export default ManageSuppliers;