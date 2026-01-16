import { useEffect, useState } from "react";
import { fetchInventory } from "../services/api";
import { useContext } from "react";
import { cartContext } from "../context/cartContext"; // Import cartContext
import { Link } from "react-router";
import PropTypes from "prop-types"; // Import PropTypes for prop validation

const HomePage = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(false);
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
      const existingItem = prevCart.find(
        (item) => item.ItemID === medicine.ItemID
      );
      if (existingItem) {
        // If the item already exists in the cart, just return the cart as is
        return prevCart;
      }
      // If the item is new, add it with an initial quantity of 1
      const newCart = [...prevCart, { ...medicine, Quantity: 1 }];
      return newCart;
    });

    // Show "Added to Cart" message
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000); // Hide after 2 seconds
  };

  return (
    <div className="container mx-auto p-4">

      {toast && (
        <div className="fixed bottom-5 right-14 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          ✓ Added to Cart!
        </div>
      )}

      <h1 className="text-3xl font-bold mb-3 text-center flex justify-between">
        <span>Available Medicines</span>
        <Link
          to="/cart"
          className="text-xl font-bold text-slate-500 hover:bg-slate-200 hover:text-green-600 border rounded-md p-2"
        >
          {" "}
          🛒Cart: {cart.length} items
        </Link>{" "}
        {/* Update cart count */}
      </h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : medicines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicines.map((medicine) => (
            <div
              key={medicine.ItemID}
              className="border rounded-lg p-6 shadow-lg bg-white hover:bg-blue-50 hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-semibold text-indigo-700">
                {medicine.Name}
              </h2>
              <p className="text-gray-800 mt-2">
                Category:{" "}
                <span className="font-medium">{medicine.Category}</span>
              </p>
              <p className="text-gray-800">
                Price:{" "}
                <span className="font-medium text-green-600">
                  BDT {medicine.Price}
                </span>
              </p>
              {/* <p className="text-gray-600">Quantity: {medicine.Quantity}</p> */}
              <button
                onClick={() => addToCart(medicine)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-red-600 font-semibold">
          No medicines are currently available for sale.
        </p>
      )}
    </div>
  );
};

HomePage.propTypes = {
  setCart: PropTypes.func.isRequired, // Add prop validation for setCart
};

export default HomePage;
