const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");

// Environment Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Create HTTP Server
const server = http.createServer(app);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    // Start the HTTP server
    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });

// Handle Server-Level Events (Optional)
server.on("error", (err) => {
  console.error("Server error:", err);
});

server.on("listening", () => {
  console.log("HTTP server is listening for incoming connections...");
});
