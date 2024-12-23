import { useEffect, useState } from "react";
import { fetchInventory } from "../services/api";

const HomePage = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMedicines = async () => {
            try {
                const response = await fetchInventory();
                console.log("Fetched medicines:", response.data); // Log the fetched medicines
                setMedicines(response.data);
            } catch (error) {
                console.error("Error fetching medicines:", error.message);
            } finally {
                setLoading(false);
            }
        };

        loadMedicines();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Available Medicines
            </h1>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : medicines.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {medicines.map((medicine) => (
                        <div
                            key={medicine.ItemID}
                            className="border rounded-md p-4 shadow hover:shadow-lg transition"
                        >
                            <h2 className="text-xl font-semibold">
                                {medicine.Name}
                            </h2>
                            <p className="text-gray-700">
                                Category: {medicine.Category}
                            </p>
                            <p className="text-gray-700">
                                Price: ${medicine.Price.toFixed(2)}
                            </p>
                            <p className="text-gray-700">
                                Quantity Available: {medicine.Quantity}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-red-500">
                    No medicines are available for sale.
                </p>
            )}
        </div>
    );
};

export default HomePage;
