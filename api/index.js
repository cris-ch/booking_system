// This is a Node.js script that uses the Express.js framework to create a web server.

const express = require("express"); // This line imports the Express.js framework and assigns it to the express constant. This allows us to create an instance of the Express application.
const app = express(); // This line creates an instance of the Express application and assigns it to the app constant. This instance will be used to handle HTTP requests and responses.
const cors = require("cors"); // This line imports the cors middleware package, which is used to enable Cross-Origin Resource Sharing (CORS). This is necessary when making requests from a web application to a different domain.
const mongoose = require("mongoose"); // This line imports the mongoose package, which is used to interact with a MongoDB database.

require("dotenv").config(); // This line loads environment variables from a .env file into the process environment. This allows us to use sensitive information, such as database connection strings, without hardcoding them into our source code.

app.use(express.json()); // This line tells the Express application to use the built-in middleware for parsing JSON request bodies.

app.use(
  // This line tells the Express application to use the cors middleware and allows requests from the specified origin (http://localhost:5173) and with credentials.
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose.connect(process.env.MONGO_URL); // This line connects to a MongoDB database using the MONGO_URL environment variable, which was loaded from the .env file. This is necessary to make queries to the database.

app.get("/test", (req, res) => {
  // This line sets up a route for handling HTTP GET requests to the /test endpoint. When a request is made to this endpoint, the server will respond with the text "Hello World!".
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  // This line sets up a route for handling HTTP POST requests to the /register endpoint. When a request is made to this endpoint, the server will extract the name, email, and password properties from the request body and respond with a JSON object containing those properties.
  const { name, email, password } = req.body;
  res.json({ name, email, password });
});

app.listen(4000); // This line tells the Express application to start listening for incoming requests on port 4000. When the server is running, it will be able to handle requests and send responses according to the routes that have been defined.
