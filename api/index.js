// This code sets up an Express server that listens on port 4000. It includes middleware for JSON parsing and CORS handling. It connects to a MongoDB database using the mongoose package. It also imports a User model from the ./models/User file and a bcrypt package for password hashing.

// The bcryptSalt variable is set using the genSaltSync method of the bcrypt package.

// There are two endpoints defined:

// A GET endpoint at /test that simply returns the string "Hello World!" when accessed.
// A POST endpoint at /register that expects a JSON payload containing name, email, and password fields. The code then attempts to create a new user in the database using the User.create() method with the given information. The password field is hashed using the bcrypt.hashSync() method with the bcryptSalt variable. If the user is created successfully, their information is returned as JSON. If there is an error creating the user, a 422 status code and the error message is returned as JSON.
// Overall, this code sets up a basic server with a user registration endpoint that stores passwords securely using bcrypt.

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}

));

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });

  if (userDoc) {
    res.json("found");
  } else {
    res.json("not found");
  }
});

app.listen(4000);

// const express = require("express"); This line imports the Express.js framework and assigns it to the express constant. This allows us to create an instance of the Express application.
// const cors = require("cors"); This line imports the cors middleware package, which is used to enable Cross-Origin Resource Sharing (CORS). This is necessary when making requests from a web application to a different domain.
// const mongoose = require("mongoose"); This line imports the mongoose package, which is used to interact with a MongoDB database.
// const User = require("./models/User"); This line imports the User model, which is used to interact with the users collection in the database.
// const bcrypt = require("bcrypt"); This line imports the bcrypt package, which is used to hash passwords before storing them in the database.
//
// const app = express(); This line creates an instance of the Express application and assigns it to the app constant. This instance will be used to handle HTTP requests and responses.
//
// const bcryptSalt = bcrypt.genSaltSync(10); This line generates a salt for use with the bcrypt package. The salt is used to make the hash more secure.
//
// require("dotenv").config(); This line loads environment variables from a .env file into the process environment. This allows us to use sensitive information, such as database connection strings, without hardcoding them into our source code.
//
// app.use(express.json()); This line tells the Express application to use the built-in middleware for parsing JSON request bodies.
//
// app.use(
//   This line tells the Express application to use the cors middleware and allows requests from the specified origin (http://localhost:5173) and with credentials.
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// mongoose.connect(process.env.MONGO_URL); This line connects to a MongoDB database using the MONGO_URL environment variable, which was loaded from the .env file. This is necessary to make queries to the database.
//
// app.get("/test", (req, res) => {
//   This line sets up a route for handling HTTP GET requests to the /test endpoint. When a request is made to this endpoint, the server will respond with the text "Hello World!".
//   res.send("Hello World!");
// });

// app.post("/register", async (req, res) => {   This line sets up a route for handling HTTP POST requests to the /register endpoint. When a request is made to this endpoint, the server will create a new user in the database and respond with the user document.
//   const { name, email, password } = req.body;
//   const userDoc = await User.create({
//     name,
//     email,
//     password: bcrypt.hashSync(password, bcryptSalt),
//   });
//
//   res.json(userDoc);
// });

// app.listen(4000); This line tells the Express application to start listening for incoming requests on port 4000. When the server is running, it will be able to handle requests and send responses according to the routes that have been defined.
