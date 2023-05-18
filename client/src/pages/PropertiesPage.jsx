import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NewPropertyForm from "../components/NewPropertyForm";
import { MdOutlineExposurePlus1 } from "react-icons/md";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import Image from "../Image";

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    axios.get("/user-properties").then(({ data }) => {
      console.log(data);
      setProperties(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex items-center bg-primary text-white py-2 px-6 rounded-full gap-2"
          to={"/account/properties/new"}
        >
          Add new property
          <MdOutlineExposurePlus1 className="h-6 w-6" />
        </Link>
      </div>
      <div className="mt-4">
        {properties.length > 0 &&
          properties.map((property, idx) => (
            <Link
              to={"/account/properties/" + property._id}
              className="cursor-pointer flex gap-4 bg-gray-100 p-4 rounded-2xl mb-2"
              key={idx}
            >
              <div className="flex w-48 h-48 rounded-2xl overflow-hidden">
                {property.photos.length > 0 && (
                  <Image
                    className="object-cover w-full h-full"
                    src={property.photos[0]}
                    alt="property photo"
                  />
                )}
              </div>
              <div className="flex-1 text-center"> {/* Added text-center class */}
                <h2 className="text-xl">{property.title}</h2>
                <div
                  className="max-h-36 overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: property.description }}
                ></div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PropertiesPage;
