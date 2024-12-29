import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { fetchSalesReport, fetchInventoryReport } from "../../services/api";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Reports = () => {
    const [salesReport, setSalesReport] = useState([]);
    const [inventoryReport, setInventoryReport] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const generateSalesReport = async () => {
        try {
            const data = await fetchSalesReport(startDate, endDate);
            setSalesReport(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching sales report:", error);
        } 
    };

    const generateInventoryReport = async () => {
        try {
            const data = await fetchInventoryReport();
            console.log(data);
            setInventoryReport(data);
        } catch (error) {
            console.error("Error fetching inventory report:", error);
        }
    };

const downloadPDF = (report, title) => {
    const doc = new jsPDF();

    // Add a title to the PDF
    doc.text(title, 10, 10);

    // Determine the headers and body dynamically based on the report type
    let headers = [];
    let tableData = [];

    if (title.includes("Sales")) {
        headers = ["#", "Sales ID", "Item Name", "Quantity", "Total Price", "Date"];
        tableData = report.map((item, index) => [
            index + 1,
            item.SalesID,
            item.ItemName,
            item.Quantity,
            `BDT ${item.TotalPrice}`,
            item.Date,
        ]);
        const totalPrice = report.reduce((total, item) => total + parseFloat(item.TotalPrice || 0), 0);
        tableData.push(["", "", "", "Total Sales Price", `BDT ${totalPrice.toFixed(2)}`, ""]);
    } else if (title.includes("Inventory")) {
        headers = ["#", "Item ID", "Item Name", "Quantity", "Expiry Date"];
        tableData = report.map((item, index) => [
            index + 1,
            item.ItemID,
            item.Name,
            item.Quantity,
            item.ExpiryDate,
        ]);
    } else {
        console.error("Unknown report type");
        return;
    }

    // Add the table using autoTable
    doc.autoTable({
        head: [headers],
        body: tableData,
        startY: 20, // Start the table below the title
    });

    // Save the PDF
    doc.save(`${title}.pdf`);
};


    return (
        <div className="flex min-h-screen">
            <Sidebar role="Admin" />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Reports Management</h1>

                {/* Sales Report */}
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-bold mb-4">Generate Sales Report</h2>
                    <div className="flex items-center space-x-4 mb-4">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="p-2 border rounded"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="p-2 border rounded"
                        />
                        <button
                            onClick={generateSalesReport}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Generate Report
                        </button>
                    </div>
                    {salesReport.length > 0 && (
                        <>
                            <table className="w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200 text-left">
                                        <th className="px-4 py-2 border-b">Sales ID</th>
                                        <th className="px-4 py-2 border-b">Item Name</th>
                                        <th className="px-4 py-2 border-b">Quantity</th>
                                        <th className="px-4 py-2 border-b">Total Price</th>
                                        <th className="px-4 py-2 border-b">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salesReport.map((item) => (
                                        <tr key={item.SalesID}>
                                            <td className="px-4 py-2 border-b">{item.SalesID}</td>
                                            <td className="px-4 py-2 border-b">{item.ItemName}</td>
                                            <td className="px-4 py-2 border-b">{item.Quantity}</td>
                                            <td className="px-4 py-2 border-b">BDT {item.TotalPrice}</td>
                                            <td className="px-4 py-2 border-b">{item.Date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="font-bold bg-gray-100">
                                        <td className="px-4 py-2 border-t text-center" colSpan="3">Total Sales Price:</td>
                                        <td className="px-4 py-2 border-t" colSpan="2">
                                            BDT {salesReport.reduce((total, item) => total + parseFloat(item.TotalPrice || 0), 0).toFixed(2)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                            <button
                                onClick={() => downloadPDF(salesReport, "Sales Report")}
                                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Download PDF
                            </button>
                        </>
                    )}

                </div>

                {/* Inventory Report */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Generate Inventory Report (Low Stock or Expired)</h2>
                    <button
                        onClick={generateInventoryReport}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Generate Report
                    </button>
                    {inventoryReport.length > 0 && (
                        <>
                            <table className="w-full bg-white border border-gray-300 mt-4">
                                <thead>
                                    <tr className="bg-gray-200 text-left">
                                        <th className="px-4 py-2 border-b">Item ID</th>
                                        <th className="px-4 py-2 border-b">Item Name</th>
                                        <th className="px-4 py-2 border-b">Quantity</th>
                                        <th className="px-4 py-2 border-b">Expiry Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventoryReport.map((item) => (
                                        <tr key={item.ItemID}>
                                            <td className="px-4 py-2 border-b">{item.ItemID}</td>
                                            <td className="px-4 py-2 border-b">{item.Name}</td>
                                            <td className="px-4 py-2 border-b">{item.Quantity}</td>
                                            <td className="px-4 py-2 border-b">{item.ExpiryDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button
                                onClick={() => downloadPDF(inventoryReport, "Inventory Report")}
                                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Download PDF
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;
