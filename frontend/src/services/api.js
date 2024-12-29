import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
    baseURL: "http://localhost/Pharmatrack/backend", // Base backend URL
    headers: {
        "Content-Type": "application/json",
    },
});

// USER APIs
export const loginUser = async (credentials) => {
    try {
        const response = await apiClient.post("/login_user.php", credentials);
        return response; // Return the response
    } catch (error) {
        console.error("API call error:", error);
        throw error; // Rethrow the error for handling in AuthContext
    }
};

export const registerUser = async (userData) => {
    return apiClient.post("/register_user.php", userData);
};

// ADMIN APIs
export const fetchAdminStats = async () => {
    try {
        const response = await apiClient.get("/admin_stats.php");
        console.log("Admin Stats Response:", response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const fetchUsers = async () => {
    const response = await apiClient.get(`/get_users.php`);
    return response.data;
};

export const addUser = async (user) => {
    const response = await apiClient.post(`/add_user.php`, user);
    return response.data;
};

export const deleteUser = async (userID) => {
    const response = await apiClient.post(`/delete_user.php`, { UserID: userID });
    return response.data;
};

export const addExpense = async (newExpense) => {
    return apiClient.post("/add_expenses.php", newExpense);
};

export const fetchExpenses = async (startDate, endDate) => {
    const url = startDate && endDate
        ? `/get_expenses.php?startDate=${startDate}&endDate=${endDate}`
        : `/get_expenses.php`;
    const response = await apiClient.get(url);
    return response.data;
};

export const fetchSalesReport = async (startDate, endDate) => {
    try {
        const response = await apiClient.get(`/sales_report.php?startDate=${startDate}&endDate=${endDate}`);
        return response.data; // Return the response data
    } catch (error) {
        console.error("API call error:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const fetchInventoryReport = async () => {
    try {
        const response = await apiClient.get("/inventory_report.php");
        return response.data; // Return the response data
    } catch (error) {
        console.error("API call error:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const addSupplier = async (supplier) => {
    try {
        const response = await apiClient.post("/manage_suppliers.php", supplier);
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error adding supplier:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const getSuppliers = async () => {
    try {
        const response = await apiClient.get("/manage_suppliers.php");
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const updateSupplier = async (supplier) => {
    try {
        const response = await apiClient.put("/manage_suppliers.php", supplier);
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error updating supplier:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const deleteSupplier = async (supplierID) => {
    try {
    const response = await apiClient.delete(`/manage_suppliers.php`, { data: { id: supplierID } });
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error deleting supplier:", error);
        throw error; // Rethrow the error for handling in the component
    }
};


// PHARMACIST APIs
export const fetchInventory = async () => {
    return apiClient.get("/manage_medicines.php");
}; // mainly this is called on home page 

// manage_medicines.php is manually called on Inventory.jsx 

export const recordSale = async (saleData) => {
    return apiClient.post("/record_sale.php", saleData);
};

export const fetchPrescriptions = async () => {
    try {
        const response = await apiClient.get("/get_prescription.php");
        return response.data;
    } catch (error) {
        console.error("Error fetching prescriptions:", error);
        throw error;
    }
};

export const updatePrescriptionStatus = async (prescriptionID, status) => {
    try {
        const response = await apiClient.post("/update_prescription.php", {
            prescriptionID,
            status
        });
        return response.data;
    } catch (error) {
        console.error("Error updating prescription:", error);
        throw error;
    }
};



// CUSTOMER APIs
export const createPrescription = async ({ medication, instructions, userID }) => {
    try {
        const response = await apiClient.post("/add_prescription.php", {
            medication,
            instructions,
            userID, // Send userID instead of customerID
        });
        console.log(medication, instructions, userID);
        console.log("Prescription response:", response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error("API call error:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const fetchInvoices = async () => {
    const userID = localStorage.getItem("userID");
    console.log("User ID:", userID);
    return apiClient.get(`/get_invoices.php?userID=${userID}`);
};

export const generateInvoice = async () => {
    const userID = localStorage.getItem("user_id"); // Retrieve user ID from local storage
    try {
        const response = await apiClient.get(`/generate_invoice.php?userID=${userID}`); // Pass user ID to the backend
        return response.data; // Return the response data
    } catch (error) {
        console.error("API call error:", error);
        throw error; // Rethrow the error for handling in the component
    }
};

export const fetchInvoiceDetails = async (invoiceID) => {
    try {
        const response = await apiClient.get(`/invoice_details.php?invoiceID=${invoiceID}`);
        return response.data; // Return the response data
    } catch (error) {
        console.error("API call error:", error);
        throw error; // Rethrow the error for handling in the component
    }
};


