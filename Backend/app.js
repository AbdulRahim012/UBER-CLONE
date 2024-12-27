const dotenv=require('dotenv');
dotenv.config();
const express = require("express");
const cors = require("cors");
// Initialize Express App
const app = express();
const cookieParser=require('cookie-parser');
const connectToDb=require('./db/db');
const userRoutes= require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
connectToDb();
// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use('/users',userRoutes);
app.use('/captains', captainRoutes);

// Export the app
module.exports = app;
