import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
// import axios from "../../services/api";

    const Dashboard = () => {
    const [stats, setStats] = useState({
        totalSales: 0,
        lowStockItems: 0,
        expenses: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get("/admin-stats.php");
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="flex">
            <Sidebar role="Admin" />

            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold">Total Sales</h2>
                        <p className="text-2xl mt-4">${stats.totalSales}</p>
                        {/* <p className="text-2xl mt-4">BDT 5000</p> */}
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold">Low Stock Items</h2>
                        <p className="text-2xl mt-4">{stats.lowStockItems}</p>
                        {/* <p className="text-2xl mt-4">5</p> */}
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold">Expenses</h2>
                        <p className="text-2xl mt-4">${stats.expenses}</p>
                        {/* <p className="text-2xl mt-4">BDT 300</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
