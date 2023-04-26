import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import Image from "../Image";
import { Link } from "react-router-dom";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((res) => {
      setBookings(res.data);
    });
  }, []);

  console.log({ bookings });
  return (
    <div>
      <AccountNav />
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id}>
            <Link to={`/property/${booking.property._id}`}>
              <h1 className="mb-2 mt-6">{booking.property.title}</h1>
              <div className="flex gap-6 bg-gray-50 rounded-2xl overflow-hidden">
                <div className="w-64">
                  <Image src={booking.property.photos[0]} />
                </div>
                <div className="">
                  <p>{booking.property.address}</p>
                  <p>
                    From:{" "}
                    {new Date(booking.checkIn).toLocaleDateString("en-GB")} to:{" "}
                    {new Date(booking.checkOut).toLocaleDateString("en-GB")}
                  </p>
                  <p>Guests: {booking.numberOfGuests}</p>
                  <p>Price per night: {booking.price}</p>
                  <p>Cleaning Fee: {booking.cleaningFee}</p>
                  <p>Total: ${booking.total}</p>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
};

export default BookingsPage;
