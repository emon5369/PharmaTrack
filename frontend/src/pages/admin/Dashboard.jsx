import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { fetchAdminStats } from "../../services/api";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalSales: 0,
        lowStockItems: 0,
        expenses: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetchAdminStats();
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="flex h-screen">
            <Sidebar role="Admin" />

            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Total Sales */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold">Total Sales</h2>
                        <p className="text-2xl mt-4">BDT {stats.totalSales}</p>
                        <Link
                            to="/admin/reports"
                            className="inline-block mt-4 text-blue-500 hover:underline"
                        >
                            View Sales Report
                        </Link>
                    </div>

                    {/* Low Stock Items */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold">Low Stock Items</h2>
                        <p className="text-2xl mt-4">{stats.lowStockItems}</p>
                    </div>

                    {/* Total Expenses */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold">Total Expenses</h2>
                        <p className="text-2xl mt-4">BDT {stats.expenses}</p>
                        <Link
                            to="/admin/expenses"
                            className="inline-block mt-4 text-blue-500 hover:underline"
                        >
                            View Expense Details
                        </Link>
                    </div>
                </div>

                {/* Quick Actions Section */}
                <div className="mt-8 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link
                            to="/admin/manage_users"
                            className="bg-blue-500 text-white py-4 px-6 rounded-lg shadow hover:bg-blue-700 flex items-center justify-center"
                        >
                            Manage Users
                        </Link>
                        <Link
                            to="/admin/manage_suppliers"
                            className="bg-green-500 text-white py-4 px-6 rounded-lg shadow hover:bg-green-700 flex items-center justify-center"
                        >
                            Manage Suppliers
                        </Link>
                        <Link
                            to="/admin/reports"
                            className="bg-yellow-500 text-white py-4 px-6 rounded-lg shadow hover:bg-yellow-700 flex items-center justify-center"
                        >
                            Generate Reports
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
