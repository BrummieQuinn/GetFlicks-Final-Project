// Import the React library
// const React = require('react');
import { createContext } from "react"

// Create a new context using the createContext method from React
// The initial context value is an object with three properties: items, addItem, and removeItem
export const MoviesContext = createContext({
    movies: [],
    addMovies: () => { },
    removeMovies: () => { }
})

// Export the ItemContext as the default export of this module