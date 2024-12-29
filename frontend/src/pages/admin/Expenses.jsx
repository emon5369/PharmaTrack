import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { fetchExpenses, addExpense } from "../../services/api";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ startDate: "", endDate: "" });
    const [newExpense, setNewExpense] = useState({
        Category: "",
        Description: "",
        Amount: "",
        Date: "",
    });

    const fetchExpenseData = async () => {
        setLoading(true);
        try {
            const data = await fetchExpenses(filters.startDate, filters.endDate);
            console.log(data);
            setExpenses(data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            const response = await addExpense(newExpense);
            console.log(response);
            if (response.status === "success") {
                alert(response.data.message);
                fetchExpenseData();
                setNewExpense({ Category: "", Description: "", Amount: "", Date: "" });
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

const downloadPDF = (expenses) => {
    const doc = new jsPDF();
    
    // Add a title to the PDF
    doc.text("Expense Report", 10, 10);
    
    // Prepare the table data
    const tableData = expenses.map((expense, index) => [
        index + 1,
        expense.Category,
        expense.Description,
        `BDT ${expense.Amount}`,
        expense.Date,
    ]);
    const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.Amount || 0), 0);
        tableData.push(["", "", "Total Expenses:", `BDT ${totalExpenses.toFixed(2)}`, ""]);
    
    doc.autoTable({
        head: [["#", "Category", "Description", "Amount", "Date"]],
        body: tableData,
        startY: 20, // Start the table below the title
    });
    
    // Save the PDF
    doc.save("Expense_Report.pdf");
}; 

    useEffect(() => {
        fetchExpenseData();
    }, [filters]);

    return (
        <div className="flex">
            <Sidebar role="Admin" />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Expense Management</h1>

                {/* Add Expense Form */}
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
                    <form onSubmit={handleAddExpense}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Category:</label>
                            <select
                                value={newExpense.Category}
                                onChange={(e) =>
                                    setNewExpense({ ...newExpense, Category: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="Rent">Rent</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Salaries">Salaries</option>
                                <option value="Maintenance">Maintenance</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Description:</label>
                            <input
                                type="text"
                                value={newExpense.Description}
                                onChange={(e) =>
                                    setNewExpense({ ...newExpense, Description: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                placeholder="e.g., Office Rent for June"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Amount:</label>
                            <input
                                type="number"
                                value={newExpense.Amount}
                                onChange={(e) =>
                                    setNewExpense({ ...newExpense, Amount: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                placeholder="e.g., 1500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Date:</label>
                            <input
                                type="date"
                                value={newExpense.Date}
                                onChange={(e) =>
                                    setNewExpense({ ...newExpense, Date: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Add Expense
                        </button>
                    </form>
                </div>

                {/* Expense List */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Expense List</h2>
                    <div className="flex items-center space-x-4 mb-4">
                        <input
                            type="date"
                            value={filters.startDate}
                            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                            className="p-2 border rounded"
                        />
                        <input
                            type="date"
                            value={filters.endDate}
                            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                            className="p-2 border rounded"
                        />
                        <button
                            onClick={fetchExpenseData}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Filter
                        </button>
                    </div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <table className="w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 border-b">Category</th>
                                        <th className="px-4 py-2 border-b">Description</th>
                                        <th className="px-4 py-2 border-b">Amount</th>
                                        <th className="px-4 py-2 border-b">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses.map((expense, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="px-4 py-2 border-b">{expense.Category}</td>
                                            <td className="px-4 py-2 border-b">{expense.Description}</td>
                                            <td className="px-4 py-2 border-b">BDT {expense.Amount}</td>
                                            <td className="px-4 py-2 border-b">{expense.Date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="font-bold bg-gray-100">
                                        <td className="px-4 py-2 border-t text-center" colSpan="3">Total Expense:</td>
                                        <td className="px-4 py-2 border-t" colSpan="2">
                                            BDT {expenses.reduce((total, expense) => total + parseFloat(expense.Amount || 0), 0).toFixed(2)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <button
                                onClick={() => downloadPDF(expenses)}
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

export default Expenses;
