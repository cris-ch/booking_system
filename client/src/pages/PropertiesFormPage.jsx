import React, { useState, useEffect } from "react";
import PhotosUploader from "../PhotosUploader";
import Features from "../PropertiesFeatures";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

const PropertiesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get("/properties/" + id).then(({ data }) => {
        setTitle(data.title);
        setAddress(data.address);
        setDescription(data.description);
        setFeatures(data.features);
        setExtraInfo(data.extraInfo);
        setCheckInTime(data.checkInTime);
        setCheckOutTime(data.checkOutTime);
        setMaxGuests(data.maxGuests);
        setAddedPhotos(data.photos);
      });
    }
  }, [id]);

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

  async function addNewPlace(e) {
    e.preventDefault();
    await axios.post("/properties", {
      title,
      address,
      description,
      features,
      extraInfo,
      checkInTime,
      checkOutTime,
      maxGuests,
      addedPhotos,
    });
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/account/properties" />;
  }

  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={addNewPlace}>
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
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          {preInput("Description", "Enter a description of your property.")}
          <textarea
            className="border-gray-500"
            value={description}
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
            value={extraInfo}
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
              <input
                type="text"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                placeholder="15:00"
              />
            </div>
            <div>
              <h3 className="mt-2 ml-3 -mb-1">Check Out</h3>
              <input
                type="text"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                placeholder="10:00"
              />
            </div>
            <div>
              <h3 className="mt-2 ml-3 -mb-1">Max. Number of Guests</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
                placeholder="5 guests"
              />
            </div>
          </div>
          <div className=" flex justify-center">
            <button className="primary my-10 max-w-[40%]">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PropertiesFormPage;
