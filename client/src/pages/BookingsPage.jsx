import React, { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import Image from "../Image";
import { Link } from "react-router-dom";
import { HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi";
import { BsPersonPlus } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { GiVacuumCleaner } from "react-icons/gi";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    axios
      .get("/bookings")
      .then(({ data }) => {
        setBookings(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  console.log({ bookings });
  return (
    <div>
      <AccountNav />
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} className="border-t border-gray-300 mb-3">
            <Link to={`/property/${booking.property._id}`}>
              <h1 className="mb-1 mt-3 text-xl">{booking.property.title}</h1>
              <div className="flex gap-6 bg-gray-50 rounded-2xl overflow-hidden">
                <div className="w-64">
                  <Image src={booking.property.photos[0]} />
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <HiOutlineLocationMarker className="text-red-400" />
                    <p className="ml-1">{booking.property.address}</p>
                  </div>
                  <div className="flex items-center">
                    <HiOutlineCalendar className="text-red-400" />
                    <p className="ml-1">
                      From:{" "}
                      {new Date(booking.checkIn).toLocaleDateString("en-GB")}{" "}
                      to:{" "}
                      {new Date(booking.checkOut).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <BsPersonPlus className="text-red-400" />
                    <p className="ml-1"> Guests: {booking.numberOfGuests}</p>
                  </div>
                  <div className="flex items-center">
                    <MdAttachMoney className="text-red-400" />
                    <p className="ml-1">Price per night: {booking.price}</p>
                  </div>
                  <div className="flex items-center">
                    <GiVacuumCleaner className="text-red-400" />
                    <p className="ml-1">Cleaning Fee: {booking.cleaningFee}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <p className="ml-1 text-xl">Total: ${booking.total}</p>
                  </div>
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
