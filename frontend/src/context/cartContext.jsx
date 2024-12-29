import { createContext, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

// Create Cart Context
export const cartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // State to manage cart items

    return (
        <cartContext.Provider value={{ cart, setCart }}>
            {children}
        </cartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired, // Validate that children is required
};
