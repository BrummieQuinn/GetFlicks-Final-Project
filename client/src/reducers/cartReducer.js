// cart actions
const SET_CART = 'SET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const EMPTY_CART = 'EMPTY_CART';

// cart action creators

// This function creates an action to set the cart state.
// It takes in a 'cart' parameter which represents the new cart state.
// The action type is 'SET_CART'.
// The returned object contains the 'type' property set to 'SET_CART' and the 'cart' property set to the provided 'cart' parameter.
export const setCart = cart => ({
    type: SET_CART,
    cart,
});

// This function creates an action to add an item to the cart.
// It takes in an 'item' parameter which represents the item to be added to the cart.
// The action type is 'ADD_TO_CART'.
// The returned object contains the 'type' property set to 'ADD_TO_CART' and the 'item' property set to the provided 'item' parameter.
export const addToCart = item => ({
    type: ADD_TO_CART,
    item,
});

// This function creates an action to remove an item from the cart.
// It takes in an 'id' parameter which represents the id of the item to be removed from the cart.
// The action type is 'REMOVE_FROM_CART'.
// The returned object contains the 'type' property set to 'REMOVE_FROM_CART' and the 'id' property set to the provided 'id' parameter.
export const removeFromCart = id => ({
    type: REMOVE_FROM_CART,
    id,
});


// Define a constant function named emptyCart that doesn't take any arguments
export const emptyCart = () => ({
	// Return an object with a property named type set to the value of EMPTY_CART
	type: EMPTY_CART,
});

// Define cart reducer function
export const cartReducer = (state, action) => {
	switch (action.type) {
		// If action type is SET_CART, return the cart from action
		case SET_CART:
			return action.cart;

		// If action type is ADD_TO_CART
		case ADD_TO_CART:
			// Find the index of the item in state with the same title as the item in action
			const itemIndex = state.findIndex(item => item.title === action.item.title);
			console.log("Item index:", itemIndex);

			// If the item is already in the cart
			if (itemIndex !== -1) {
				// Create a new array with the same items as state
				const newState = [...state];
				// Increment the cartQuantity of the item at itemIndex
				newState[itemIndex].cartQuantity++;
				console.log("New state:", newState);
				// Return the new state
				return newState;
			} else { // If the item is not in the cart
				// Create a new item with the same properties as the item in action
				const newItem = {
					...action.item,
					cartQuantity: 1,
				};
				console.log("New item:", newItem);
				// Return a new array with the same items as state and the new item
				return [...state, newItem];
			}

		// If action type is REMOVE_FROM_CART
		case REMOVE_FROM_CART:
			// Filter out the item with the same id as the action id from state
			const updatedState = state.filter(item => item.id !== action.id);
			console.log("Updated state:", updatedState);
			return updatedState;

		// If action type is EMPTY_CART, return an empty array
		case EMPTY_CART:
			console.log("Emptying cart");
			return [];

		// For any other action type, return the current state
		default:
			console.log("No changes to state");
			return state;
	}
};
