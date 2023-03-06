const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "erboejrnberojfn";

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
    const isPasswordValid = bcrypt.compareSync(password, userDoc.password);
    if (isPasswordValid) {
      jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, (err, token) => {
        if (err) {
          res.status(422).json(err);
        }
        res.cookie("token", token).json(userDoc);
      });
    } else {
      res.status(422).json("wrong password");
    }
  } else {
    res.json("not found");
  }
});

app.listen(4000);
