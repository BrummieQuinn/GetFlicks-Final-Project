import React, {createContext} from 'react';

// Create a new context using the createContext method from React
// The initial value of the context is an object with three properties: order, createOrder, and processOrder
const OrderContext = React.createContext({
  order: null, // Holds the current order (initially null)
  createOrder: () => { }, // Function to create a new order
  processOrder: () => { }, // Function to process the order
});

// Export the OrderContext so it can be used in other parts of the codebase
export default OrderContext;
