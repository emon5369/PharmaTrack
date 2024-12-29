import React from "react";
import Sidebar from "../../components/Sidebar";

const CustomerDashboard = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar role="Customer" />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold">Request a Prescription</h2>
                        <p className="text-gray-600 mt-2">
                            Submit new prescription requests online.
                        </p>
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={() => (window.location.href = "/customer/request")}
                        >
                            Request Now
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold">Invoices</h2>
                        <p className="text-gray-600 mt-2">
                            View your purchase history and download invoices.
                        </p>
                        <button
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                            onClick={() => (window.location.href = "/customer/invoices")}
                        >
                            View Invoices
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
