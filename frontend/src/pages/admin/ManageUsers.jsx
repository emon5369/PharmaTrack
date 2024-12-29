import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { fetchUsers, addUser, deleteUser } from "../../services/api";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newUser, setNewUser] = useState({
        Role: "Customer",
        Name: "",
        Email: "",
        Password: "",
        ContactInfo: "",
    });

    // Fetch user data
    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    // Add a new user
    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await addUser(newUser);
            console.log(response);
            console.log("New User Added:", response.newUser);
            if (response.success) {
                alert(response.message);
                setNewUser({
                    Role: "Customer",
                    Name: "",
                    Email: "",
                    Password: "",
                    ContactInfo: "",
                });
                setUsers((prev) => [...prev, response.newUser]);
                console.log("New User Added:", response);
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    // Delete a user
    const handleDeleteUser = async (userID) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const response = await deleteUser(userID);
            if (response.success) {
                alert(response.message);
                setUsers((prev) => prev.filter((user) => user.UserID !== userID));
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Filter users by role
    const admins = users.filter((user) => user && user.Role === "Admin");
    const pharmacists = users.filter((user) => user && user.Role === "Pharmacist");
    const customers = users.filter((user) => user && user.Role === "Customer");

    return (
        <div className="flex">
            <Sidebar role="Admin" />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

                {/* Add New User */}
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-xl font-bold mb-4">Add New User</h2>
                    <form onSubmit={handleAddUser}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Role:</label>
                            <select
                                value={newUser.Role}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, Role: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                            >
                                <option value="Admin">Admin</option>
                                <option value="Pharmacist">Pharmacist</option>
                                <option value="Customer">Customer</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name:</label>
                            <input
                                type="text"
                                value={newUser.Name}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, Name: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                placeholder="Enter name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email:</label>
                            <input
                                type="email"
                                value={newUser.Email}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, Email: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                placeholder="Enter email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password:</label>
                            <input
                                type="password"
                                value={newUser.Password}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, Password: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Contact Info:</label>
                            <input
                                type="text"
                                value={newUser.ContactInfo}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, ContactInfo: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                                placeholder="Enter contact info"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Add User
                        </button>
                    </form>
                </div>

                {/* User Lists by Role */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">User Lists by Role</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <h3 className="text-lg font-bold mt-4">Admins</h3>
                            <UserTable users={admins} handleDeleteUser={handleDeleteUser} />
                            <h3 className="text-lg font-bold mt-4">Pharmacists</h3>
                            <UserTable users={pharmacists} handleDeleteUser={handleDeleteUser} />
                            <h3 className="text-lg font-bold mt-4">Customers</h3>
                            <UserTable users={customers} handleDeleteUser={handleDeleteUser} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// User Table Component
const UserTable = ({ users, handleDeleteUser }) => (
    <table className="w-full bg-white border border-gray-300 mt-4">
        <thead>
            <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Contact Info</th>
                <th className="px-4 py-2 border-b">Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
                <tr key={user.UserID}>
                    <td className="px-4 py-2 border-b">{user.Name}</td>
                    <td className="px-4 py-2 border-b">{user.Email}</td>
                    <td className="px-4 py-2 border-b">{user.ContactInfo}</td>
                    <td className="px-4 py-2 border-b">
                        <button
                            onClick={() => handleDeleteUser(user.UserID)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default ManageUsers;
