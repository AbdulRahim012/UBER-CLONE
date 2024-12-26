const dotenv=require('dotenv');
dotenv.config();
const express = require("express");
const cors = require("cors");
// Initialize Express App
const app = express();
const connectToDb=require('./db/db');
const userRoutes= require('./routes/user.routes');
connectToDb();
// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use('/users',userRoutes);

// Export the app
module.exports = app;
