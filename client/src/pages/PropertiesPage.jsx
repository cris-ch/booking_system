import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import NewPropertyForm from "../NewPropertyForm";
import { MdOutlineExposurePlus1 } from "react-icons/md";
import AccountNav from "../AccountNav";
import axios from 'axios';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    axios.get('/properties').then(({ data }) => {
      console.log(data)
      setProperties(data);
    })
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex bg-primary text-white py-2 px-6 rounded-full gap-2"
          to={"/account/properties/new"}
        >
          Add new property
          <MdOutlineExposurePlus1 className="h-6 w-6" />
        </Link>
      </div>
      <div className="mt-4">
        {properties.length > 0 && properties.map(property => (
          <Link to={'/account/properties/'+property._id} className="cursor-pointer flex gap-4 bg-gray-300 p-4 rounded-2xl">
            <div className="flex w-45 h-40 bg-gray-400 grow shrink-0">
              {property.photos.length > 0 && (
                <img className="object-cover" src={"http://localhost:4000/uploads/"+property.photos[0]} alt="property photo" />  
              )}
            </div>
            <div className="grow-0 shrink">
            <h2 className="text-xl">{property.title}</h2>
            <p>{property.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;
