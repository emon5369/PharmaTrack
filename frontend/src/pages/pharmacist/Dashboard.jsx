import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { fetchInventory, fetchPrescriptions } from "../../services/api";

const PharmacistDashboard = () => {
    const [inventoryCount, setInventoryCount] = useState(0);
    const [lowStockItems, setLowStockItems] = useState(0);
    const [pendingPrescriptions, setPendingPrescriptions] = useState(0);

    useEffect(() => {
        // Fetch inventory and prescription stats
        const fetchDashboardData = async () => {
            try {
                const inventoryData = await fetchInventory();
                setInventoryCount(inventoryData.data.medicines.length);
                setLowStockItems(inventoryData.data.medicines.filter((item) => item.Quantity < 50).length);

                const prescriptionsData = await fetchPrescriptions();
                console.log("Fetched prescriptions data:", prescriptionsData);
                setPendingPrescriptions(
                    prescriptionsData.data.filter((prescription) => prescription.status === "Pending").length
                );
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="flex h-screen">
            <Sidebar role="Pharmacist" />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Pharmacist Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Inventory Overview */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold">Inventory Overview</h2>
                        <p className="text-gray-600 mt-2">
                            Total Items: <span className="font-bold">{inventoryCount}</span>
                        </p>
                        <p className="text-gray-600 mt-2">
                            Low Stock Items: <span className="font-bold text-red-500">{lowStockItems}</span>
                        </p>
                        <Link
                            to="/pharmacist/inventory"
                            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Manage Inventory
                        </Link>
                    </div>

                    {/* Prescription Management */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold">Prescription Management</h2>
                        <p className="text-gray-600 mt-2">
                            Pending Prescriptions: <span className="font-bold">{pendingPrescriptions}</span>
                        </p>
                        <Link
                            to="/pharmacist/prescriptions"
                            className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Manage Prescriptions
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PharmacistDashboard;
