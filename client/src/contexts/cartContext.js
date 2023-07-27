// Import the React library
import React, { createContext } from 'react';

// Create a new context object called CartContext
// The initial value of the context contains an empty cart array and four functions: addToCart, removeFromCart, and emptyCart
const CartContext = React.createContext({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { },
    emptyCart: () => { }
});

// Export the CartContext object as the default export of this module
export default CartContext;
