import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AdminDashboard from "../pages/admin/Dashboard";
// import PharmacistDashboard from "../pages/pharmacist/Dashboard";
// import CustomerDashboard from "../pages/customer/Dashboard";

const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.Role : null;
};
const AppRoutes = () => {
    const userRole = getUserRole();
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            {/* Admin Routes */}
            {/* {userRole === "Admin" && (
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            )} */}

            {/* Pharmacist Routes */}
            {userRole === "Pharmacist" && (
                <Route path="/pharmacist/dashboard" element={<PharmacistDashboard />} />
            )}

            {/* Customer Routes */}
            {userRole === "Customer" && (
                <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            )}
        </Routes>
    );
};

export default AppRoutes;
