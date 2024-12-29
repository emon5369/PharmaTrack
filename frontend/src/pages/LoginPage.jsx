import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const LoginPage = () => {
    const { login } = useContext(AuthContext); // Get login function from context
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log("Attempting login with credentials:", { email, password });
            const response = await login({ email, password });
            console.log("Login response:", response);

            const { role, userID, name } = response.user;

            // Store user data in localStorage for session management
            localStorage.setItem("userID", userID);
            localStorage.setItem("role", role);
            localStorage.setItem("userName", name);

            console.log("Login response structure:", response);
            if (response.status === 'success') {
                // Store user details in localStorage
                localStorage.setItem("user", JSON.stringify(response.user));
                alert("Login successful!");

                console.log("Navigating to:", role === "Admin" ? "/admin/dashboard" : role === "Pharmacist" ? "/pharmacist/dashboard" : "/customer/dashboard");

                if (role === "Admin") navigate("/admin/dashboard");
                else if (role === "Pharmacist") navigate("/pharmacist/dashboard");
                else if (role === "Customer") navigate("/customer/dashboard");
                else throw new Error("Invalid role.");
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
                <p className="text-center text-gray-600 text-sm mt-4"> Don't have an account?
                    <Link to="/register" className="text-blue-500 hover:text-blue-700">
                        Sign up
                    </Link>
                </p>

            </form>
        </div>
    );
};

export default LoginPage;
