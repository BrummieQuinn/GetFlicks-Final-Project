const Movies  = require('./models/movies');

// Define the get_items controller action function server-side CRUD operations


module.exports.get_movies = async (req, res) => {

  const pageSize = 20;
  const pageNumber = parseInt(req.query.page) || 1;
 
  try {

    // Find all items in the database and sort them by title in ascending order
    const movies = await Movies.find()
      .sort({ title: 1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .select('title year genres poster price hasStock stock')
      .lean();
    
    // Send the first 14 movies as a response to the client
    const first14Movies = movies.slice(0, 15);

    // send the extra movies after the first 14 to the carousel - change variable to carousel movies
    const extraMovies = movies.slice(15);

    // Respond with the items in JSON format
    res.json({first14Movies, extraMovies});
    
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving items' });
  }
};

module.exports.post_movies = (req, res) => {
  // Create a new item object using the request body
  const newMovies = new Movies(req.body);

  // Save the new item to the database
  newMovies.save()
    .then(movies => {
      // Send a JSON response with the saved item
      res.json(movies);
    });
}

module.exports.update_movies = (req, res) => {
  // Retrieve the request body, which contains the updated item information
  const updatedMovies = req.body;

  // Update all items in the database that match the specified criteria with the updated item information
  Movies.updateMany(req.body, updatedMovies)
    .then(function (movies) {
      // Send the updated item as a JSON response
      res.json(movies);
    });
};

// Export the function as 'delete_item'
module.exports.delete_movies = (req, res) => {
  // Use the 'deleteMany' method of the 'Item' model to delete multiple items
  Movies.deleteMany(req.body)
    // Once the deletion is successful, execute the callback function
    .then(function (movies) {
      // Send a JSON response with a success message
      res.json({ success: true });
    });
};










