import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState("");

  useEffect(() => {
    if (!id) return;
    axios.get("/properties/" + id).then((res) => {
      setProperty(res.data);
      console.log(res.data);
    });
  }, [id]);

  if (!property) return null;

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-6">
      <h1 className="text-2xl">{property.title}</h1>
      <a
        className="my-1 block font-semibold underline"
        target="_blank"
        href={"https://maps.google.com/?q=" + property.address}
      >
        {property.address}
      </a>
      <div className="grid gap-2 grid-cols-[2fr_1fr]">
        <div className="">
          {property.photos?.[0] && (
            <div className="">
              <img
                className="aspect-square object-cover"
                src={"http://localhost:4000/uploads/" + property.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid ">
          {property.photos?.[1] && (
            <img
              className="aspect-square object-cover"
              src={"http://localhost:4000/uploads/" + property.photos[1]}
              alt=""
            />
          )}
          <div className="overflow-hidden">
            {property.photos?.[2] && (
              <div className="">
                <img
                  className="aspect-square object-cover relative top-2"
                  src={"http://localhost:4000/uploads/" + property.photos[2]}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
