// Import the Mongoose library
const mongoose = require('mongoose');

// Import the Schema class from Mongoose
const Schema = mongoose.Schema;

// Create a new schema called ItemSchema
const MoviesSchema = new Schema({
    // Define a field called 'title' with type String, which is required
    title: {
        type: String,
        required: true
    },
    // Define a field called 'genres' with type Array, which is required
    genres: {
        type: Array,
        required: true
    },
    // Define a field called 'year' with type Number, which is required
    year: {
        type: Number,
        required: true
    },
    // Define a field called 'poster' with type String, which is required
    poster: {
        type: String,
        required: true
    },
    // Define a field called 'price' with type String, which is required
    price: {
        type: String,
        required: true
    },
    // Define a field called 'hasStock' with type Boolean
    hasStock: {
        type: Boolean
    },
    // Define a field called 'stock' with type Number, which is required
    stock: {
        type: Number,
        required: true
    }
});

// Print a debug message when the ItemSchema is created
console.log('MoviesSchema created');

// Export the Mongoose model with the name 'Movies' and the MoviesSchema
module.exports = Movies = mongoose.model('Movies', MoviesSchema, 'movies_poster');
