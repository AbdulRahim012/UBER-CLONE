const http = require("http");

const app = require("./app");

// Environment Variables
const PORT = process.env.PORT || 5000;

// Create HTTP Server
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
