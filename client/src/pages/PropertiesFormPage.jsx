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
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get("/properties/" + id).then(({ data }) => {
        setTitle(data.title);
        setAddress(data.address);
        setDescription(data.description);
        setFeatures(data.features);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setAddedPhotos(data.photos);
        setPrice(data.price);
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

  async function saveProperty(e) {
    e.preventDefault();
    const propertyData = {
      title,
      address,
      description,
      features,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      addedPhotos,
      price,
    };
    if (id) {
      await axios.put("/properties/", {
        id,
        ...propertyData,
      });
      setRedirect(true);
    } else {
      await axios.post("/properties", {
        ...propertyData,
      });
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to="/account/properties" />;
  }

  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={saveProperty}>
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
            "Check In/Out Times",
            "Enter the check in and check out times for your property."
          )}
          <div className="grid mt-2 gap-2 grid-cols-2">
            <div>
              <h3 className="mt-2 ml-3 -mb-1">Check In</h3>
              <input
                type="text"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                placeholder="15:00"
              />
            </div>
            <div>
              <h3 className="mt-2 ml-3 -mb-1">Check Out</h3>
              <input
                type="text"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                placeholder="10:00"
              />
            </div>
          </div>
          {preInput(
            "Max Number of Guests",
            "Enter the maximum number of guests your property can accommodate."
          )}
          <div>
              <h3 className="mt-2 ml-3 -mb-1">Max. Number of Guests</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
                placeholder="5 guests"
              />
            </div>
            {preInput(
            "Price per Night",
            "Enter the price per night for your property."
          )}
            <div>
              <h3 className="mt-2 ml-3 -mb-1">Price per Night</h3>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="100"
              />
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
