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
      <div>
        {properties.length > 0 && properties.map(property => (
          <div>
            {property.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;
