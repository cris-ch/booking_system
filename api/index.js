

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  // This line sets up a route for handling HTTP GET requests to the /test endpoint. When a request is made to this endpoint, the server will respond with the text "Hello World!".
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

