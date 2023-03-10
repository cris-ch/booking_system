import React, { useState } from "react";
import Features from "./PropertiesFeatures";
import { MdFileUpload } from "react-icons/md";

const NewPropertyForm = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return <h2 className="text-xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-md">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    );
  }

  return (
    <div>
      <form>
        <h1 className="text-xl">Property Details</h1>
        {preInput(
          "Title",
          "Enter a title. Should be a short description of the property."
        )}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title i.e: Central Home"
        />
        {preInput("Address", "Enter the address of your property.")}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address i.e: 123 Main St"
        />
        {preInput(
          "Photos",
          "Add photos of your property. You can add up to 10 photos."
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={photoLink}
            onChange={(e) => e.target.value}
            placeholder="Add photo using a link"
          />
          <button className="bg-gray-200 px-4 rounded-2xl">
            Add&nbsp;photo
          </button>
        </div>
        <div className="mt-2 grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
          <button className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
            <MdFileUpload className="mt-1.5" />
            Upload
          </button>
        </div>
        {preInput("Description", "Enter a description of your property.")}
        <textarea
          className="border-gray-500"
          type={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        {preInput("Features", "Select the features of your property.")}
        <Features selected={features} onChange={setFeatures} />
        {preInput(
          "Extra Info",
          "Enter any extra information about your property."
        )}
        <textarea
          className="border-gray-500"
          type={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
          placeholder="Extra Info"
        />
        {preInput(
          "Check In/Out. Max Number of Guests",
          "Enter the check in and check out times."
        )}
        <div className="grid mt-2 gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 ml-3 -mb-1">Check In</h3>
            <input type="text" 
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
            placeholder="15:00" />
          </div>
          <div>
            <h3 className="mt-2 ml-3 -mb-1">Check Out</h3>
            <input type="text" 
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)}
            placeholder="10:00" />
          </div>
          <div>
            <h3 className="mt-2 ml-3 -mb-1">Max. Number of Guests</h3>
            <input type="number" 
            value={maxGuests}

            onChange={(e) => setMaxGuests(e.target.value)}
            placeholder="5 guests" />
          </div>
        </div>
        <div className=" flex justify-center">
          <button className="primary my-10 max-w-[40%]">Save</button>
        </div>
      </form>
    </div>
  );
};

export default NewPropertyForm;
