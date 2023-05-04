import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image";

const IndexPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/properties").then((res) => {
      setProperties(res.data);
      setLoading(false);
    }).catch(error => {
      console.log(error);
      setLoading(false);
    });
  }, []);

  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {loading ? (
        <p>Loading properties...</p>
      ) : properties.length > 0 ? (
        properties.map((property) => (
          <Link to={`/property/${property._id}`} key={property._id}>
            <div className="flex bg-gray-500 rounded-2xl mb-2">
              {property.photos[0] && (
                <Image
                  className="rounded-2xl object-cover aspect-square"
                  src={property.photos[0]}
                  alt="property photo"
                />
              )}
            </div>
            <h2 className="font-bold">{property.address}</h2>
            <h3 className="text-md truncate text-gray-500">{property.title}</h3>

            <div className="text-sm text-left mt-2">
              <span className="font-bold"> ${property.price}</span> per night
            </div>
          </Link>
        ))
      ) : (
        <p>No properties found</p>
      )}
    </div>
  );
};

export default IndexPage;
