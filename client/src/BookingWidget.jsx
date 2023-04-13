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
    setCheckOut(e.target.value); // reset check out date when check in date changes
  };

  const numberOfNights =
    checkIn &&
    checkOut &&
    differenceInDays(new Date(checkOut), new Date(checkIn));

  return (
    <div className=" sticky top-5 bg-white shadow p-3 rounded-2xl">
      <div className="text-xl text-center">${property.price} per night</div>
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
        <div className="flex py-3 px-4 items-center">
          <label className="w-full">Number of Guests:</label>
          <input
            className=""
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between items-center text-center p-2">
        <div className="font-light underline">
          ${property.price} x{" "}
          {checkIn && checkOut && <span>{numberOfNights} nights</span>}
        </div>
        <div>
          <span className="">${property.price * numberOfNights} </span>
        </div>
      </div>
      <div className="flex justify-between items-center text-center p-2">
        <span className="font-light underline">Cleaning Fee:</span>
        <span className="">${property.cleaningFee} </span>
      </div>
      <div className="flex justify-between items-center text-center p-2 border-t">
        <span className="text-xl">Total</span>
        <span className="text-xl">
          ${property.price * numberOfNights + property.cleaningFee}{" "}
        </span>
      </div>

      <button className="primary">Reserve</button>
    </div>
  );
};

export default BookingWidget;
