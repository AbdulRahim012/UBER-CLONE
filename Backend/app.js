require("dotenv").config();
const express = require("express");
const cors = require("cors");


// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Export the app
module.exports = app;
