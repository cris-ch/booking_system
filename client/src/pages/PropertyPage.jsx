import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { BiMap } from "react-icons/bi";
import BookingWidget from "../BookingWidget";
import Image from "../Image";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState("");
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get("/properties/" + id).then((res) => {
      setProperty(res.data);
      console.log(res.data);
    });
  }, [id]);

  if (!property) return null;

  if (showAllPhotos) {
    const images = property.photos.map((photo) => ({
      original: photo,
      thumbnail: photo,
    }));

    return (
      <div className="fixed inset-0 bg-black">
        <div className="p-6 grid gap-1 relative">
          <button
            onClick={() => setShowAllPhotos(false)}
            className="z-50 absolute top-5 right-5 flex items-center gap-1 py-1 px-1 bg-white rounded-xl shadow shadow-sm shadow-white"
          >
            <IoCloseOutline />
          </button>
          <div>
            <ImageGallery
              items={images}
              showFullscreenButton={false}
              thumbnailWidth={100}
              thumbnailHeight={100}
              showBullets={true}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8">
      <h1 className="text-2xl">{property.title}</h1>
      <a
        className="my-1 ml-1 block font-semibold underline flex items-center"
        target="_blank"
        href={"https://maps.google.com/?q=" + property.address}
      >
        <BiMap />
        {property.address}
      </a>

      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
          <div className="">
            {property.photos?.[0] && (
              <div className="">
                <Image
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover"
                  src={property.photos[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid ">
            {property.photos?.[1] && (
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square object-cover"
                src={property.photos[1]}
                alt=""
              />
            )}
            <div className="overflow-hidden">
              {property.photos?.[2] && (
                <div className="">
                  <Image
                    onClick={() => setShowAllPhotos(true)}
                    className="aspect-square object-cover relative top-2"
                    src={property.photos[2]}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex items-center gap-1 absolute bottom-2 right-2 py-1 px-3 bg-white rounded-xl shadow shadow-md shadow-gray-500"
        >
          <BsGrid3X3GapFill />
          Show all photos
        </button>
      </div>

      <div className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="">
          <div className="my-4">{property.description}</div>
          Check-In: {property.checkIn}:00hs <br />
          Check-Out: {property.checkOut}:00hs <br />
          Guests: {property.maxGuests} <br />
        </div>
        <div className="">
          <BookingWidget property={property} />
        </div>
      </div>
      <div className="bg-white -mx-8 -mb-4 pb-16 border-t mt-6 px-6">
        <div className="font-semibold mt-6 pt-3">Extra Info</div>
        <div className="text-gray-600 my-2 text-m leading-5">
          {property.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
