// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("../client/config/default.json");
const cors = require("cors");

// Import route handlers and models
const moviesRouter = require("../client/routes/movies");
const {
  get_movies,
  post_movies,
  update_movies,
  delete_movies,
} = require("./moviesControllers");
const Movies = require("./models/movies");

// Create an instance of the Express application
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/movies_poster", moviesRouter);

// Define the Express API routes
app.get("/api/movies_poster", get_movies);
app.post("/api/movies_poster", post_movies);
app.put("/api/movies_poster/:id", update_movies);
app.delete("/api/movies_poster/:id", delete_movies);

// Serve client files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const dbURI = config.dbURI;
const port = process.env.PORT || 4000;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to MongoDB", result);

    // Create an index on the 'year' field of the movies collection
    Movies.collection.createIndex({ year: 1 });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
