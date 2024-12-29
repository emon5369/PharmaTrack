import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { fetchInvoices } from "../../services/api";
import { Link } from "react-router-dom";

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getInvoices = async () => {
            try {
                const data = await fetchInvoices();
                setInvoices(data.data.data);
            } catch (error) {
                console.error("Error fetching invoices:", error);
            } finally {
                setLoading(false);
            }
        };

        getInvoices();
    }, []);

    return (
        <div className="flex min-h-screen">
            <Sidebar role="Customer" />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Invoices</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="px-4 py-2 border-b">Invoice ID</th>
                                <th className="px-4 py-2 border-b">Date</th>
                                <th className="px-4 py-2 border-b">Total Amount</th>
                                <th className="px-4 py-2 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((invoice) => (
                                <tr key={invoice.invoiceID}>
                                    <td className="px-4 py-2 border-b">{invoice.invoiceID}</td>
                                    <td className="px-4 py-2 border-b">{invoice.dateIssued}</td>
                                    <td className="px-4 py-2 border-b">BDT {invoice.totalAmount}</td>
                                    <td className="px-4 py-2 border-b">
                                        <Link
                                            to={`/customer/invoiceDetails?invoiceID=${invoice.invoiceID}`}
                                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                                        >
                                            View
                                        </Link>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Invoices;
