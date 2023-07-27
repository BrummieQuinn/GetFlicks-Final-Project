// imports 
import {useState, createContext, useContext, useReducer} from 'react';
import { UseCart } from '../controllers/cartController';
import OrderContext from '../contexts/orderContext';

// functions controlling orders in local storage

function createOrder() {
    // Access the cart and emptyCart functions from the UseCart hook
    const { cart, emptyCart } = UseCart();
    
    // Create an empty order object with items and total properties
    let order = {
        items: [],
        total: 0
    };

    // Log the current cart and order objects
    console.log('Cart:', cart);
    console.log('Order:', order);

    // Loop through each item in the cart
    for (let item of cart) {
        // Create a new object for each item in the order's items array
        order.items.push({
            title: item.title,
            price: item.price,
            cartQuantity: item.cartQuantity
        });
       
        // Calculate the total price by multiplying the item's price by its quantity and adding it to the order's total
        order.total += item.price * item.cartQuantity;
    }

    // Format the order's total as a string with the currency symbol and 2 decimal places
    order.total = '£' + order.total.toFixed(2);

    // Store the order object in local storage as a JSON string
    localStorage.setItem('order', JSON.stringify(order));

    // Empty the cart by calling the emptyCart function
    emptyCart();

    // Return the order object
    return order;
}

// Define the order processing function
function processOrder(req, res) {
    // Simulating a successful payment
    const paymentSuccess = true;

    if (paymentSuccess) {
        // Create an order
        const order = createOrder();

        // Send a JSON response with a success message and the order details
        res.json({
            msg: '[SUCCESS] Payment successful. Your order has been placed.',
            order: order
        });
    } else {
        // Send a JSON response with an error message
        res.json({ msg: '[ERROR] Payment failed. Please check payment method and try again.' });
    }
}

export function OrderProvider({ children }) {
  // Initialize the order state using the createOrder function
  const [order, setOrder] = useState(createOrder(null));
  
  // Get the cart and emptyCart function from UseCart hook
  const { cart, emptyCart } = UseCart();
  
  // Function to create a new order
  const CreateOrder = () => {
    // Initialize an empty order object
    let newOrder = {
      items: [],
      total: 0
    };
    
    // Iterate through each item in the cart
    for (let item of cart) {
      // Create a new item object with title, price, and cartQuantity
      newOrder.items.push({
        title: item.title,
        price: item.price,
        cartQuantity: item.cartQuantity
      });
      
      // Calculate the total price of the item and update the order total
      newOrder.total += item.price * item.cartQuantity;
    }
    
    // Format the order total as a string with £ symbol and 2 decimal places
    newOrder.total = '£' + newOrder.total.toFixed(2);

    // Set the new order state
    setOrder(newOrder);
    
    // Empty the cart
    emptyCart();

    // Return the new order
    return newOrder;
  };
  
  // Function to process the order
  const processOrder = () => {
    // Simulate a successful payment
    const paymentSuccess = true;
    
    // If payment is successful, create a new order
    if (paymentSuccess) {
      return createOrder();
    } else {
      return null;
    }
  };

  // Return the OrderContext.Provider with order, createOrder, and processOrder values
  return (
    <OrderContext.Provider value={{ order, createOrder, processOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
// export the module functions

module.exports = {
	processOrder,
	createOrder
};

