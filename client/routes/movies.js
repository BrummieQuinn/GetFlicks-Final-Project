// Import the Router class from the express module
const { Router } = require('express');

// Import the moviesController module from the ../../serverside/moviesControllers file
const moviesController = require('../../serverside/moviesControllers');

// Create a new instance of the Router class
const router = Router();

// Define a route for GET /movies_poster
router.get('/movies_poster', (req, res) => {
  console.log('GET /movies_poster');
  moviesController.get_movies(req, res);
});

// Define a route for GET /movies_poster/:year
router.get('/movies_poster/:year', (req, res) => {
  console.log(`GET /movies_poster/${req.params.year}`);
  moviesController.get_movies_by_year(req, res);
});

// Define a route for POST /movies_poster
router.post('/movies_poster', (req, res) => {
  console.log('POST /movies_poster');
  moviesController.add_movies(req, res);
});

// Define a route for PUT /movies_poster/:id
router.put('/movies_poster/:id', (req, res) => {
  console.log(`PUT /movies_poster/${req.params.id}`);
  moviesController.update_movies(req, res);
});

// Define a route for DELETE /movies_poster/:id
router.delete('/movies_poster/:id', (req, res) => {
  console.log(`DELETE /movies_poster/${req.params.id}`);
  moviesController.delete_movies(req, res);
});

// Export the router object
module.exports = router;
