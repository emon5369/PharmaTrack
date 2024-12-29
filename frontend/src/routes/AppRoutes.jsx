import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/cartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdminDashboard from "../pages/admin/Dashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageSuppliers from "../pages/admin/ManageSuppliers";
import Expenses from "../pages/admin/Expenses";
import Reports from "../pages/admin/Reports";
import PharmacistDashboard from "../pages/pharmacist/Dashboard";
import InventoryPage from "../pages/pharmacist/Inventory";
import Prescriptions from "../pages/pharmacist/Prescriptions";
import CustomerDashboard from "../pages/customer/Dashboard";
import PrescriptionRequest from "../pages/customer/PrescriptionRequest";
import Invoices from "../pages/customer/Invoices";
import InvoiceDetails from "../pages/customer/InvoiceDetails"; // Importing InvoiceDetails
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AppRoutes = () => {
    const { isLoggedIn, userRole } = useContext(AuthContext);

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Role-Based Routes */}
            {isLoggedIn && userRole === "Admin" && (
                <>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/manage_users" element={<ManageUsers />} />
                <Route path="/admin/manage_suppliers" element={<ManageSuppliers />} />
                <Route path="/admin/expenses" element={<Expenses />} />
                <Route path="/admin/reports" element={<Reports />} />
                </>
            )}
            {isLoggedIn && userRole === "Pharmacist" && (
                <>
                    <Route path="/pharmacist/dashboard" element={<PharmacistDashboard />} />
                    <Route path="/pharmacist/inventory" element={<InventoryPage />} />
                    <Route path="/pharmacist/prescriptions" element={<Prescriptions />} />
                </>
            )}
            {isLoggedIn && userRole === "Customer" && (
                <>
                    <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                    <Route path="/customer/request" element={<PrescriptionRequest />} />
                    <Route path="/customer/invoices" element={<Invoices />} />
                    <Route path="/customer/invoiceDetails" element={<InvoiceDetails />} /> {/* New route for invoice details */}
                </>
            )}

            {/* Fallback Route */}
            {/* <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} /> */}
        </Routes>
    );
};

export default AppRoutes;
