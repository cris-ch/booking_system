import React from "react";

const BookingWidget = (property) => {
  return (
    <div className="bg-white shadow p-3 rounded-2xl">
      <div className="text-xl text-center">
        Price: ${property.price} per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check In:</label>
            <input type="date" />
          </div>
          <div className="py-3 px-4">
            <label>Check Out:</label>
            <input type="date" />
          </div>
        </div>
        <div className="py-3 px-4">
          <label>Number of Guests:</label>
          <input type="number" value={1} />
        </div>
      </div>

      <button className="primary">Book this property</button>
    </div>
  );
};

export default BookingWidget;
