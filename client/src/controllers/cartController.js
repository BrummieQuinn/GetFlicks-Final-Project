// Local Storage shopping cart that uses the item schema from models/item.js
// imports from react
import { useContext, useState, useEffect } from "react";
import cartContext from "../contexts/cartContext";

const moviesController = require('../../../serverside/moviesControllers');

function addProduct(product) {
  // Retrieve the cart from local storage or initialize an empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Find the index of the product in the cart based on its title
  let itemIndex = cart.findIndex(item => item.title === product.title);

  // If the product is already in the cart, increment its cartQuantity
  if (itemIndex !== -1) {
    cart[itemIndex].cartQuantity++;
  } else {
    // Create a new item object with the product details and a cartQuantity of 1
    let item = {
      title: product.title,
      genres: product.genres,
      year: product.year,
      poster: product.poster,
      price: product.price,
      hasStock: product.hasStock,
      stock: product.stock,
      cartQuantity: 1
    };

    // Add the new item to the cart
    cart.push(item);
  }

  // Update the cart in local storage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Log the updated cart for debugging purposes
  console.log('Updated cart:', cart);
}

function getCart() {
  console.log('getCart function called'); // added console.log statement for debugging
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Successfully retrieved cart:', cart); // added console.log statement for debugging
    return cart;
  } catch (error) {
    console.error('Error parsing cart:', error); // added console.log statement for debugging
    return [];
  }
}

// Function to create a new product object from a document in the MongoDB database 
function createProductFromDocument(document) {
	// Log the document being used to create the product
	console.log("Creating product from document:", document);
	
	// Destructure the necessary properties from the document
	const { title, genres, year, poster, price, hasStock, stock } = document;
	
	// Create a new product object with the extracted properties
	const product = {
		title,
		genres,
		year,
		poster,
		price,
		hasStock,
		stock
	};
	
	// Log the created product
	console.log("Created product:", product);
	
	// Return the created product
	return product;
}
// retrieve data for multiple movies from the mongoDB database

let movies = moviesController.get_items();

// iterate through the movies array and create a new product object for each movie using for each loop
movies.forEach(movieData => {
	let product = createProductFromDocument(movieData);

// add the product to the cart using the addProduct() function
	addProduct(product);
});

// function for users to update quantity of a product in the cart using the movie title as the argument
function quantityIncrease(title) {
  // get current cart from local storage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // find the index of the movie in the cart array with the matching title
  let itemIndex = cart.findIndex(item => item.title === title);

  // if the movie is found, increment its quantity
  if (itemIndex !== -1) {
    cart[itemIndex].cartQuantity++;
  }

  // save the updated cart to local storage
  localStorage.setItem('cart', JSON.stringify(cart));

  // log the updated cart for debugging
  console.log('Updated cart:', cart);
}

function quantityDecrease(title) {
  // Retrieve the cart from the local storage or initialize it as an empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Find the index of the item in the cart that matches the given title
  let itemIndex = cart.findIndex(item => item.title === title);
  
  // If the item is found and its cartQuantity is greater than 0
  if (itemIndex !== -1 && cart[itemIndex].cartQuantity > 0) {
    // Decrease the cartQuantity of the item by 1
    cart[itemIndex].cartQuantity--;

    // If the cartQuantity becomes 0 after the decrease, remove the item from the cart
    if (cart[itemIndex].cartQuantity === 0) {
      cart.splice(itemIndex, 1);
    }
  }
  
  // Save the updated cart back to the local storage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Print the updated cart to the console
  console.log('Updated cart:', cart);
}

//console.log statements for debugging

function emptyCart() {
    console.log("Entering emptyCart function");

    // Create an empty cart array
    let cart = [];

    // Save empty cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Cart cleared and saved to local storage");
}

// This function removes a product from the cart based on its title
function removeProduct(title) {
    // Get the cart from local storage or initialize it as an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Find the index of the item with the matching title in the cart
    let itemIndex = cart.findIndex(item => item.title === title);

    // If the item was found in the cart
    if (itemIndex !== -1) {
        // Remove the item from the cart
        cart.splice(itemIndex, 1);
    }

    // Log the updated cart to the console
    console.log('Updated cart:', cart);

    // Update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Log the title of the removed product to the console
    console.log('Product removed:', title);
}
const calculateTotalPrice = (cart) => {
    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * item.cartQuantity
    }, 0);
    return totalPrice.toFixed(2);

// local storage shopping cart that uses the item schema from models\item.js imports from react
// React useContext and useState hooks for shopping cart
export function CartProvider({ children }) {
  // Retrieve cart from localStorage or create an empty cart
  const [cart, setCart] = useState(getCart());

  // Add a product to the cart
  const addToCart = (product) => {
    // Create a new copy of the cart array
    let newCart = [...cart];

    // Find the index of the product in the cart
    let itemIndex = newCart.findIndex(item => item.title === product.title);

    // If the product is already in the cart, increase its cartQuantity
    if (itemIndex !== -1) {
      newCart[itemIndex].cartQuantity++;
    } else {
      // If the product is not in the cart, create a new item and add it to the cart
      let item = {
        title: product.title,
        genres: product.genres,
        year: product.year,
        poster: product.poster,
        price: product.price,
        hasStock: product.hasStock,
        stock: product.stock,
        cartQuantity: 1,
      };
      newCart.push(item);
    }

    // Update the cart state and save it to localStorage
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };
  
  // Remove a product from the cart
  const removeFromCart = (title) => {
    // Create a new copy of the cart array
    let newCart = [...cart];

    // Find the index of the product in the cart
    let itemIndex = newCart.findIndex(item => item.title === title);

    // If the product is found in the cart, remove it
    if (itemIndex !== -1) {
      newCart.splice(itemIndex, 1);
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  // Empty the cart completely
  const emptyCart = () => {
    // Set the cart state to an empty array
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
    };
    ``

    const getTotalPrice = () => {
        return calculateTotalPrice(cart)
    };
    

  // Provide the cart and cart-related functions to the children components
  return (
    <cartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart, getTotalPrice }}>
      {children}
    </cartContext.Provider>
  );
}

// Define a function called "useCart" that returns the cart context.
export function useCart() {
  // Get the cart context using the useContext hook.
  const context = useContext(cartContext);

  // Throw an error if the context is not available.
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  // Return the cart context.
  return context;
}



module.exports = {
	addProduct,
	getCart,
	quantityIncrease,
	quantityDecrease,
	emptyCart,
    removeProduct,
    useCart,
    getTotalPrice
}
