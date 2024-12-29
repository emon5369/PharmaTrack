import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { fetchPrescriptions, updatePrescriptionStatus } from "../../services/api";

const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    useEffect(() => {
        const getPrescriptions = async () => {
            try {
                const data = await fetchPrescriptions();
                console.log(data);
                setPrescriptions(data.data);
            } catch (error) {
                console.error("Error fetching prescriptions:", error);
            } finally {
                setLoading(false);
            }
        };

        getPrescriptions();
    }, []);

    const handleStatusChange = async (prescriptionID, newStatus) => {
        setUpdatingStatus(true);
        setUpdateError(null);
        try {
            const response = await updatePrescriptionStatus(prescriptionID, newStatus);
            if (response.success) {
                setPrescriptions((prev) =>
                    prev.map((p) =>
                        p.id === prescriptionID ? { ...p, status: newStatus } : p
                    )
                );
            } else {
                setUpdateError(response.message || "Failed to update status");
            }
        } catch (error) {
            console.error("Error updating prescription status:", error);
            setUpdateError("An error occurred while updating the status");
        } finally {
            setUpdatingStatus(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar role="Pharmacist" />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Prescriptions Management</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="w-full bg-white border border-gray-300">
                        <thead className="text-left">
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border-b">Prescription ID</th>
                                <th className="px-4 py-2 border-b">Customer Name</th>
                                <th className="px-4 py-2 border-b">Medication Details</th>
                                <th className="px-4 py-2 border-b">Instructions</th>
                                <th className="px-4 py-2 border-b">Status</th>
                                <th className="px-4 py-2 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prescriptions.map((prescription) => (
                                <tr key={prescription.id}>
                                    <td className="px-4 py-2 border-b">{prescription.id}</td>
                                    <td className="px-4 py-2 border-b">{prescription.user.name}</td>
                                    <td className="px-4 py-2 border-b">
                                        {prescription.medication}
                                    </td>
                                    <td className="px-4 py-2 border-b">{prescription.instructions}</td>
                                    <td className="px-4 py-2 border-b text-green-600">{prescription.status}</td>
                                    <td className="px-4 py-2 border-b">
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={prescription.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        prescription.id,
                                                        e.target.value
                                                    )
                                                }
                                                className="border p-1 rounded"
                                                disabled={updatingStatus}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processed">Processed</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                            {updatingStatus && (
                                                <div className="w-4 h-4 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                                            )}
                                        </div>
                                        {updateError && (
                                            <div className="text-red-500 text-sm mt-1">{updateError}</div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Prescriptions;
