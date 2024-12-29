import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { useContext } from "react";

const Sidebar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName") || "User";
    const userRole = localStorage.getItem("role") || "Role"; 

    const links = {
        Admin: [
            { name: "Dashboard", path: "/admin/dashboard" },
            { name: "Manage Users", path: "/admin/manage_users" },
            { name: "Manage Suppliers", path: "/admin/manage_suppliers" },
            { name: "Expenses", path: "/admin/expenses" },
            { name: "Reports", path: "/admin/reports" },    
        ],
        Pharmacist: [
            { name: "Dashboard", path: "/pharmacist/dashboard" },
            { name: "Inventory", path: "/pharmacist/inventory" },
            { name: "Prescriptions", path: "/pharmacist/prescriptions" },
        ],
        Customer: [
            { name: "Dashboard", path: "/customer/dashboard" },
            { name: "Request Prescription", path: "/customer/request" },
            { name: "Invoices", path: "/customer/invoices" },
        ],
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
        window.location.reload();    
    };

    return (
        <div className="h-100% w-64 bg-blue-800 text-white flex flex-col">
            {/* User Info */}
            <div className="py-6 px-4 text-center">
                <h2 className="text-xl font-bold">{userName}</h2>
                <p className="text-sm text-blue-200 capitalize">{userRole}</p>
            </div>

            {/* Navigation Links */}
            <ul className="flex-1">
                {links[userRole].map((link, index) => (
                    <li key={index} className="py-2">
                        <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "block px-4 py-2 bg-blue-700 rounded"
                                    : "block px-4 py-2 hover:bg-blue-700"
                            }
                        >
                            {link.name}
                        </NavLink>
                    </li>
                ))}
            </ul>

            {/* Logout Button */}
            <div className="py-4 px-4 border-t border-blue-700">
                <button
                    onClick={handleLogout}
                    className="text-white w-full py-2 bg-red-500 rounded hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
