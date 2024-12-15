import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
    baseURL: "http://localhost/pharmatrack", // Base backend URL
    headers: {
        "Content-Type": "application/json",
    },
});

// USER APIs
export const loginUser = async (credentials) => {
    return apiClient.post("/login.php", credentials);
};

export const fetchUserDetails = async (userID) => {
    return apiClient.get(`/user.php?userID=${userID}`);
};

// ADMIN APIs
export const getAllUsers = async () => {
    return apiClient.get("/admin/users.php");
};

export const addExpense = async (data) => {
    return apiClient.post("/admin/expense.php", data);
};

export const generateReport = async () => {
    return apiClient.get("/admin/reports.php");
};

// PHARMACIST APIs
export const fetchInventory = async () => {
    return apiClient.get("/pharmacist/inventory.php");
};

export const addPrescription = async (data) => {
    return apiClient.post("/pharmacist/prescription.php", data);
};

export const manageSales = async (saleData) => {
    return apiClient.post("/pharmacist/sales.php", saleData);
};

// CUSTOMER APIs
export const requestPrescription = async (requestData) => {
    return apiClient.post("/customer/request.php", requestData);
};

export const fetchInvoices = async (customerID) => {
    return apiClient.get(`/customer/invoices.php?customerID=${customerID}`);
};
