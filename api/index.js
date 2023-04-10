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
const mime = require("mime-types");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "erboejrnberojfn";
const bucket = "cristian-booking-app";

require("dotenv").config();

app.use(express.json());
app.use(CookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);


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

app.get("/api/test", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.send("Hello World!");
});

app.post("/api/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
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

app.post("/api/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
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

app.get("/api/profile", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
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

app.post("/api/logout", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.cookie("token", "").json(true);
});

app.post("/api/upload-by-url", async (req, res) => {
  const { url } = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  await imageDownloader.image({
    url,
    dest: "/tmp/" + newName,
  });
  const link = await uploadToS3(`/tmp/${newName}`, newName, mime.lookup(`/tmp/${newName}`));
  res.json(link);
});

const photosMiddleware = multer({ dest: "/tmp" });
app.post("/api/upload", photosMiddleware.array("photos", 20), async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname, mimetype } = req.files[i];
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
});

app.post("/api/properties", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
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

app.get("/api/user-properties", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const properties = await Property.find({ owner: userData.id });
      res.json(properties);
    });
  }
});

app.get("/api/properties/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const property = await Property.findById(req.params.id);
      res.json(property);
    });
  }
});

app.put("/api/properties", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
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

app.get("/api/properties", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const properties = await Property.find();
  res.json(properties);
});

app.listen(4000);
