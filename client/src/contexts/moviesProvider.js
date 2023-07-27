// Defining the components using useState to manage item state client-side 
import { useState } from 'react';
import {MoviesContext} from './moviesContext'

export default function MoviesProvider({ children }) {
	// Declare a state variable 'items' and a function 'setItems' to update it
	const [movies, setMovies] = useState([]);
	// Define a function 'addItem' that takes an 'item' as an argument
	const addMovies = (item) => {
		// update the 'items' state by adding the 'item' to the previous items
		setMovies(prevItems => [...prevItems, item]);
		// Define a function 'removeItem' that takes an 'id' as an argument
		const removeMovies = (id) => {
			// update the 'items' state by filtering out the item with the given 'id'
			setMovies((prevItems) => prevItems.filter((item) => item.id !== id));
		};
		// Return the 'ItemContext.Provider' component with the 'items', 'addItem', and 'removeItem' values
		return (
			<MoviesContext.Provider value={{ movies, addMovies, removeMovies }}>
				{children}
			</MoviesContext.Provider>

		);
	}
}
