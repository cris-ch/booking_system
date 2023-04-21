import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";

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
            <h2>{booking.property.title}</h2>
            <p>{booking.property.address}</p>
            <p>{booking.checkIn}</p>
            <p>{booking.checkOut}</p>
            <p>{booking.property.maxGuests}</p>
            <p>{booking.price}</p>
          </div>
        ))
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
};

export default BookingsPage;
