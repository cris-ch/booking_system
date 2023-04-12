import React, { useState } from "react";
import { differenceInDays } from "date-fns";

const BookingWidget = ({ property }) => {
  const [checkIn, setCheckIn] = useState(new Date().toISOString().slice(0, 10));
  const [checkOut, setCheckOut] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );

  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const handleCheckInChange = (e) => {
    setCheckIn(e.target.value);
    setCheckOut(""); // reset check out date when check in date changes
  };

  return (
    <div className="bg-white shadow p-3 rounded-2xl">
      <div className="text-xl text-center">
        Price: ${property.price} per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check In:</label>
            <input type="date" value={checkIn} onChange={handleCheckInChange} />
          </div>
          <div className="py-3 px-4">
            <label>Check Out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn} // set min value to check in date
            />
          </div>
        </div>
        <div className="py-3 px-4">
          <label>Number of Guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
      </div>
      <div className="text-center py-2">
        Total: ${" "}
        {property.price *
          differenceInDays(new Date(checkOut), new Date(checkIn))}
      </div>
      <div className="text-center pb-2">
        Number of nights:{" "}
        {checkIn && checkOut && (
          <span>
            {differenceInDays(new Date(checkOut), new Date(checkIn))}
          </span>
        )}
      </div>
      <button className="primary">Book this property</button>
    </div>
  );
};

export default BookingWidget;
