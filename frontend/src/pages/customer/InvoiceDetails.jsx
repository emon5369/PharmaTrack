import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchInvoiceDetails } from "../../services/api";

const InvoiceDetails = () => {
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State for error handling
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const invoiceID = query.get("invoiceID");

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await fetchInvoiceDetails(invoiceID);
                setInvoice(data.data);
                setError(null); // Clear any previous errors
            } catch (error) {
                console.error("Error fetching invoice details:", error);
                setError("Failed to fetch invoice details. Please try again."); // Set error message
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [invoiceID]);

    const printInvoice = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Invoice Details</h1>
                {loading ? (
                    <p className="text-lg text-gray-600">Loading...</p>
                ) : error ? ( // Check for error state
                    <p className="text-red-500">{error}</p> // Display error message
                ) : (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-700">Invoice ID: <span className="text-gray-600">{invoice[0]?.InvoiceID}</span></h2>
                            <p className="text-lg text-gray-600">Customer Name: <span className="text-gray-600 font-semibold">{invoice[0]?.CustomerName}</span></p>
                            <p className="text-lg text-gray-600">Date Issued: <span className="text-gray-600 font-semibold">{invoice[0]?.DateIssued}</span></p>
                            <p className="text-lg text-gray-600">Total Amount: <span className="font-bold text-green-600">BDT {invoice[0]?.TotalAmount}</span></p>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Items</h3>
                        <ul className="space-y-4">
                            {invoice.map((item, index) => (
                                <li key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded shadow-sm">
                                    <div>
                                        <p className="font-medium text-gray-700">{item.ItemName}</p>
                                        <p className="text-sm text-gray-500">Quantity: {item.Quantity}</p>
                                    </div>
                                    <p className="text-lg font-semibold text-gray-800">BDT {item.TotalPrice}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between">
                        <button
                            onClick={printInvoice}
                            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition duration-200"
                        >
                            Print Invoice
                        </button>
                        <button
                            onClick={() => navigate(-1)} // Navigate back
                            className="mt-6 bg-gray-600 text-white px-6 py-2 rounded shadow hover:bg-red-600 transition duration-200"
                        >
                            Exit
                        </button>
                        </div>
                    </div>
                    
                )}
            </div>
        </div>
    );
};

export default InvoiceDetails;
