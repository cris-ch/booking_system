const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Property = require("./models/Property");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "erboejrnberojfn";
const bucket = "cristian-booking-app";

require("dotenv").config();

app.use(express.json());
app.use(CookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose.connect(process.env.MONGO_URL);

const uploadToS3 = async (path, originalFileName, mimeType) => {
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFileName.split(".");
  const extension = parts[parts.length - 1];
  const newFileName = "photo" + Date.now() + "." + extension;
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFileName,
      ContentType: mimeType,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFileName}`;
};

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
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        (err, token) => {
          if (err) {
            res.status(422).json(err);
          }
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("wrong password");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-url", async (req, res) => {
  const { url } = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  await imageDownloader.image({
    url,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "/tmp" });
app.post("/upload", photosMiddleware.array("photos", 20), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname, mimetype } = req.files[i];
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
});

app.post("/properties", async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    description,
    addedPhotos,
    features,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const propertyDoc = await Property.create({
        owner: userData.id,
        title,
        address,
        description,
        photos: addedPhotos,
        features,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      res.json(propertyDoc);
    });
  } else {
    res.json(null);
  }
});

app.get("/user-properties", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const properties = await Property.find({ owner: userData.id });
      res.json(properties);
    });
  }
});

app.get("/properties/:id", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const property = await Property.findById(req.params.id);
      res.json(property);
    });
  }
});

app.put("/properties", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    description,
    addedPhotos,
    features,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const propertyDoc = await Property.findById(id);
    if (propertyDoc.owner.toString() === userData.id) {
      propertyDoc.set({
        title,
        address,
        description,
        photos: addedPhotos,
        features,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await propertyDoc.save();
      res.json("ok");
    }
  });
});

app.get("/properties", async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

app.listen(4000);
