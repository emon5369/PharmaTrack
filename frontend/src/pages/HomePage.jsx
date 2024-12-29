import { useEffect, useState } from "react";
import { fetchInventory } from "../services/api"; 
import { useContext } from "react"; 
import { cartContext } from "../context/cartContext"; // Import cartContext
import { Link } from "react-router";
import PropTypes from "prop-types"; // Import PropTypes for prop validation

const HomePage = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Access cart context
    const { cart, setCart } = useContext(cartContext); // Use context to get cart and setCart

    useEffect(() => {
        const loadMedicines = async () => {
            try {
                const response = await fetchInventory();
                console.log("Fetched medicines:", response.data); // Log the fetched medicines
                setMedicines(response.data.medicines);
            } catch (error) {
                console.error("Error fetching medicines:", error.message);
            } finally {
                setLoading(false);
            }
        };

        loadMedicines();
    }, []);

    const addToCart = (medicine) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.ItemID === medicine.ItemID);
            if (existingItem) {
                // If the item already exists in the cart, just return the cart as is
                return prevCart;
            }
            // If the item is new, add it with an initial quantity of 1
            const newCart = [...prevCart, { ...medicine, Quantity: 1 }];
            return newCart;
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center flex justify-between">
                <span>Available Medicines</span>
                <Link to="/cart" className="text-lg font-semibold hover:font-bold text-slate-500 hover:text-green-600 border rounded-md p-2"> 🛒Cart: {cart.length} items</Link> {/* Update cart count */}
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
                                Price: BDT {medicine.Price}
                            </p>
                            {/* <p className="text-gray-700">
                                Quantity Available: {medicine.Quantity}
                            </p> */}
                            <button
                                onClick={() => addToCart(medicine)} // Ensure this line is present
                                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            >
                                Add to Cart
                            </button>
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

HomePage.propTypes = {
    setCart: PropTypes.func.isRequired, // Add prop validation for setCart
};

export default HomePage;
