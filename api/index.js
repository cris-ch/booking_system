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
const Booking = require("./models/Booking");

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

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getUserData = async (req) => {
  try {
    const userData = await jwt.verify(req.cookies.token, jwtSecret, {});
    return userData;
  } catch (error) {
    throw error;
  }
};

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

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        req.userData = userData;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
    
  }

};

// Middleware to check ownership of property
const checkOwnership = async (req, res, next) => {
  if (req.body && req.body.id) {
    const propertyDoc = await Property.findById(req.body.id);
    if (propertyDoc && propertyDoc.owner.toString() === req.userData.id) {
      req.propertyDoc = propertyDoc;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
};


app.post("/api/register", async (req, res) => {
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
      res.status(401).json({ message: "Invalid email or password" });
    }
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});


app.get("/api/profile", verifyToken, async (req, res) => {
  const { name, email, _id } = await User.findById(req.userData.id);
  res.json({ name, email, _id });
});


app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/api/upload-by-url", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res
      .status(400)
      .json({ message: "Please provide a valid image URL" });
  }

  const newName = "photo" + Date.now() + ".jpg";

  await imageDownloader.image({
    url,
    dest: "/tmp/" + newName,
  });
  const link = await uploadToS3(
    `/tmp/${newName}`,
    newName,
    mime.lookup(`/tmp/${newName}`)
  );
  res.json(link);
});

const photosMiddleware = multer({ dest: "/tmp" });
app.post(
  "/api/upload",
  photosMiddleware.array("photos", 20),
  async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname, mimetype } = req.files[i];
      const url = await uploadToS3(path, originalname, mimetype);
      uploadedFiles.push(url);
    }
    res.json(uploadedFiles);
  }
);

app.post("/api/properties", verifyToken, async (req, res) => {
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
    cleaningFee,
  } = req.body;
  const propertyDoc = await Property.create({
    owner: req.userData.id,
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
    cleaningFee,
  });
  res.json(propertyDoc);
});

app.get("/api/user-properties", verifyToken, async (req, res) => {
  const properties = await Property.find({ owner: req.userData.id });
  res.json(properties);
});

app.get("/api/properties/:id", async (req, res) => {
  const property = await Property.findById(req.params.id);
  res.json(property);
});

app.put("/api/properties", verifyToken, checkOwnership, async (req, res) => {
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
    cleaningFee,
  } = req.body;
  req.propertyDoc.set({
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
    cleaningFee,
  });
  await req.propertyDoc.save();
  res.json("ok");
});

app.get("/api/properties", async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

app.post("/api/bookings", verifyToken, async (req, res) => {
  const userData = await getUserData(req);
  const {
    propertyId,
    checkIn,
    checkOut,
    numberOfGuests,
    price,
    cleaningFee,
    total,
  } = req.body;
  const bookingDoc = await Booking.create({
    property: propertyId,
    user: userData.id,
    checkIn,
    checkOut,
    numberOfGuests,
    price,
    cleaningFee,
    total,
  });
  res.json(bookingDoc);
});

app.get("/api/bookings", verifyToken, async (req, res) => {
  const userData = await getUserData(req);
  res.json(await Booking.find({ user: userData.id }).populate("property"));
});

app.delete("/api/properties/:id", verifyToken, async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.owner.toString() !== req.userData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Property.findByIdAndDelete(propertyId);

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/api/delete-account", verifyToken, async (req, res) => {
  try {
    const userData = await getUserData(req);
    const user = await User.findById(userData.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(userData.id);

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.listen(4000);
