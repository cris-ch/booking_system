const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
  title: String,
  address: String,
  photos: [String],
  description: String,
  features: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number,
  cleaningFee: Number,
});

const PropertyModel = mongoose.model("Property", propertySchema);

module.exports = PropertyModel;
