import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setUserRole(role);
    }, [isLoggedIn]); // Update userRole whenever login state changes

    return (
        <nav className="bg-blue-500 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">PharmaTrack</h1>
                <ul className="flex space-x-6">
                    {userRole === 'Customer' && (
                        <li>
                            <Link to="/" className="hover:text-gray-200">Home</Link>
                        </li>
                    )}
                    {isLoggedIn ? (
                        <>
                            {userRole === 'Admin' && (
                                <li>
                                    <Link to="/admin/dashboard" className="hover:text-gray-200">Admin Dashboard</Link>
                                </li>
                            )}
                            {userRole === 'Pharmacist' && (
                                <li>
                                    <Link to="/pharmacist/dashboard" className="hover:text-gray-200">Pharmacist Dashboard</Link>
                                </li>
                            )}
                            {userRole === 'Customer' && (
                                <li>
                                    <Link to="/customer/dashboard" className="hover:text-gray-200">Customer Dashboard</Link>
                                </li>
                            )}
                            <li>
                                <button
                                    onClick={() => {
                                        logout();
                                        navigate('/login');
                                        window.location.reload(); // Reset the app state
                                    }}
                                    className="hover:text-gray-200"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login" className="hover:text-gray-200">Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
