import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setUserRole(role);
    }, [isLoggedIn]);

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <h1 className="text-3xl font-extrabold tracking-wide">
                    <Link to="/" className="hover:text-gray-200">
                        PharmaTrack
                    </Link>
                </h1>

                {/* Navigation Links */}
                <ul className="flex space-x-8 text-lg font-medium">
                    {userRole === "Customer" && (
                        <li>
                            <Link to="/" className="hover:text-yellow-300 transition">
                                Home
                            </Link>
                        </li>
                    )}
                    {isLoggedIn ? (
                        <>
                            {userRole === "Admin" && (
                                <li>
                                    <Link
                                        to="/admin/dashboard"
                                        className="hover:text-yellow-300 transition"
                                    >
                                        Admin Dashboard
                                    </Link>
                                </li>
                            )}
                            {userRole === "Pharmacist" && (
                                <li>
                                    <Link
                                        to="/pharmacist/dashboard"
                                        className="hover:text-yellow-300 transition"
                                    >
                                        Pharmacist Dashboard
                                    </Link>
                                </li>
                            )}
                            {userRole === "Customer" && (
                                <li>
                                    <Link
                                        to="/customer/dashboard"
                                        className="hover:text-yellow-300 transition"
                                    >
                                        Customer Dashboard
                                    </Link>
                                </li>
                            )}
                            <li>
                                <button
                                    onClick={() => {
                                        logout();
                                        navigate("/login");
                                        window.location.reload(); // Reset the app state
                                    }}
                                    className="hover:text-red-300 transition"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login" className="hover:text-yellow-300 transition">
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
