// Local Storage shopping cart that uses the item schema from models/item.js
// imports from react
import MoviesControllers from '../../../node_modules/moviesControllers';

export function addProduct(product) {
    // Retrieve the cart from local storage or initialize an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || []

    // Find the index of the product in the cart based on its title
    let itemIndex = cart.findIndex(item => item.title === product.title)

    // If the product is already in the cart, increment its cartQuantity
    if (itemIndex !== -1) {
        cart[itemIndex].cartQuantity++
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
        }

        // Add the new item to the cart
        cart.push(item)
    }

    // Update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart))

    // Log the updated cart for debugging purposes
    console.log('Updated cart:', cart)
}



// Function to create a new product object from a document in the MongoDB database 
export function createProductFromDocument(document) {
    // Log the document being used to create the product
    console.log("Creating product from document:", document)

    // Destructure the necessary properties from the document
    const { title, genres, year, poster, price, hasStock, stock } = document

    // Create a new product object with the extracted properties
    const product = {
        title,
        genres,
        year,
        poster,
        price,
        hasStock,
        stock
    }

    // Log the created product
    console.log("Created product:", product)

    // Return the created product
    return product
}
// retrieve data for multiple movies from the mongoDB database

let movies = MoviesControllers.get_items()

// iterate through the movies array and create a new product object for each movie using for each loop
movies.forEach(movieData => {
    let product = createProductFromDocument(movieData)

    // add the product to the cart using the addProduct() function
    addProduct(product)
})

// function for users to update quantity of a product in the cart using the movie title as the argument
export function quantityIncrease(title) {
    // get current cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || []

    // find the index of the movie in the cart array with the matching title
    let itemIndex = cart.findIndex(item => item.title === title)

    // if the movie is found, increment its quantity
    if (itemIndex !== -1) {
        cart[itemIndex].cartQuantity++
    }

    // save the updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart))

    // log the updated cart for debugging
    console.log('Updated cart:', cart)
}

export function quantityDecrease(title) {
    // Retrieve the cart from the local storage or initialize it as an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || []

    // Find the index of the item in the cart that matches the given title
    let itemIndex = cart.findIndex(item => item.title === title)

    // If the item is found and its cartQuantity is greater than 0
    if (itemIndex !== -1 && cart[itemIndex].cartQuantity > 0) {
        // Decrease the cartQuantity of the item by 1
        cart[itemIndex].cartQuantity--

        // If the cartQuantity becomes 0 after the decrease, remove the item from the cart
        if (cart[itemIndex].cartQuantity === 0) {
            cart.splice(itemIndex, 1)
        }
    }

    // Save the updated cart back to the local storage
    localStorage.setItem('cart', JSON.stringify(cart))

    // Print the updated cart to the console
    console.log('Updated cart:', cart)
}

//console.log statements for debugging

export function emptyCart() {
    console.log("Entering emptyCart function")

    // Create an empty cart array
    let cart = []

    // Save empty cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log("Cart cleared and saved to local storage")
}

// This function removes a product from the cart based on its title
export function removeProduct(title) {
    // Get the cart from local storage or initialize it as an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || []

    // Find the index of the item with the matching title in the cart
    let itemIndex = cart.findIndex(item => item.title === title)

    // If the item was found in the cart
    if (itemIndex !== -1) {
        // Remove the item from the cart
        cart.splice(itemIndex, 1)
    }

    // Log the updated cart to the console
    console.log('Updated cart:', cart)

    // Update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart))

    // Log the title of the removed product to the console
    console.log('Product removed:', title)
}
export const calculateTotalPrice = (cart) => {
    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * item.cartQuantity
    }, 0)
    return totalPrice.toFixed(2)

}