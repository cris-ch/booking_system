const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  price: Number,
  cleaningFee: Number,
  total: Number,
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;