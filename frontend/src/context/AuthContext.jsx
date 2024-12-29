import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loginUser } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null); // Add userRole in context

    useEffect(() => {
        // Check if a user is already logged in (based on localStorage)
        const storedUser = localStorage.getItem("user");
        const role = localStorage.getItem("userRole");
        if (storedUser) {
            setIsLoggedIn(true);
            setUserRole(role);
        }
    }, [isLoggedIn]);

    const login = async (credentials) => {
        try {
            const response = await loginUser(credentials);
            if (response.data.status === 'success') {
                setIsLoggedIn(true);

                // Store user details and role in localStorage
                localStorage.setItem("user", JSON.stringify(response.data.user));
                const role = response.data.user.role;
                localStorage.setItem("userRole", role);
                setUserRole(role); // Update context state
                return response.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserRole(null); // Clear role in context
        localStorage.clear(); // Clear localStorage
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
