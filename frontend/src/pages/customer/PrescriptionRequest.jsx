import { useState } from "react";
import { createPrescription } from "../../services/api"; // Import the createPrescription function
import Sidebar from "../../components/Sidebar"; // Corrected import statement

const PrescriptionRequest = () => {
    const [medication, setMedication] = useState("");
    const [instructions, setInstructions] = useState("");
    const [submitted, setSubmitted] = useState(false); 
    const [error, setError] = useState(null); // State to handle errors

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(false); // Reset submitted state
        setError(null); // Reset error state

        try {
            // Retrieve customerID from localStorage
            const userID = JSON.parse(localStorage.getItem("userID"));
            console.log("Customer ID:", userID);
            await createPrescription({ medication, instructions, userID }); // Call the API function with customerID
            setSubmitted(true); 
            setMedication("");
            setInstructions("");
        } catch (err) {
            console.error(err); // Log the error for debugging
            setError("Failed to submit prescription request. Please try again."); // Set error message
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar role="Customer" />
            <div className="flex-1 p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Request Prescription</h1>
                {submitted ? (
                    <div className="bg-green-100 p-4 rounded text-green-700">
                        Your prescription request has been submitted successfully!
                    </div>
                ) : error ? ( // Display error message if exists
                    <div className="bg-red-100 p-4 rounded text-red-700">
                        {error}
                    </div>
                ) : null}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Medication:</label>
                        <input
                            type="text"
                            value={medication}
                            onChange={(e) => setMedication(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter medication details"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Instructions:</label>
                        <textarea
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter any special instructions"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PrescriptionRequest;