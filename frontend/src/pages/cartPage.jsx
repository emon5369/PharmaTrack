import { useContext } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { cartContext } from "../context/cartContext"; // Import cartContext

import { recordSale } from "../services/api"; // Import recordSale function (ensure it's used)

const CartPage = () => {
    const { cart, setCart } = useContext(cartContext); // Access cart context

    const increaseQuantity = (item) => {
        setCart((prevCart) => {
            return prevCart.map((cartItem) => {
                if (cartItem.ItemID === item.ItemID) {
                    return { ...cartItem, Quantity: cartItem.Quantity + 1 }; // Increase quantity
                }
                return cartItem;
            });
        });
    };

    const decreaseQuantity = (item) => {
        setCart((prevCart) => {
            return prevCart.map((cartItem) => {
                if (cartItem.ItemID === item.ItemID) {
                    const newQuantity = cartItem.Quantity - 1;
                    return { ...cartItem, Quantity: newQuantity > 0 ? newQuantity : 1 }; // Decrease quantity but not below 1
                }
                return cartItem;
            });
        });
    };

    const removeItem = (item) => {
        setCart((prevCart) => prevCart.filter(cartItem => cartItem.ItemID !== item.ItemID)); // Remove item from cart
    };

    const totalAmount = cart.reduce((total, item) => total + item.Price * item.Quantity, 0); // Calculate total amount

    const handlePurchase = async () => {
        const userID = localStorage.getItem("userID"); // Retrieve customer ID from local storage
        try {
            for (const item of cart) {
                const totalPrice = item.Price * item.Quantity; // Calculate total price for the item
                const saleData = {
                    userID: userID,
                    itemID: item.ItemID,
                    quantity: item.Quantity,
                    totalPrice: totalPrice, // Include total price in the sale data
                };
                const response = await recordSale(saleData); // Call recordSale with item data
                console.log("Purchase successful!", response.data);
                alert("Purchase successful!");
                setCart([]);
            }
        } catch (error) {
            console.error("Error recording sale:", error); // Log error message
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-center text-red-500">Your cart is empty.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cart.map((item, index) => (
                        <div key={index} className="border rounded-md p-4 shadow hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold">{item.Name}</h2>
                            <p className="text-gray-700">Price: BDT {item.Price}</p>
                            <div className="flex items-center gap-2">
                                <p className="text-gray-700 text-xl">Quantity: {item.Quantity}</p>
                                <button
                                    onClick={() => increaseQuantity(item)} // Button to increase quantity
                                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => decreaseQuantity(item)} // Button to decrease quantity
                                    className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                                >
                                    -
                                </button>
                                <button
                                    onClick={() => removeItem(item)} // Button to remove item
                                    className="mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                >
                                    Remove Item
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <h2 className="text-xl font-semibold mt-4">Total Amount: BDT {totalAmount.toFixed(2)}</h2>
            <button
                onClick={handlePurchase} // Purchase button
                className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
                Confirm Purchase
            </button>
        </div>
    );
};

CartPage.propTypes = {
    cartItems: PropTypes.array.isRequired, // Validate that cartItems is an array
};

export default CartPage;
