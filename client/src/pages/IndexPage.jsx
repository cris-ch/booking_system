import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
const IndexPage = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    axios.get("/properties").then((res) => {
      setProperties(res.data);
    });
  }, []);
  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {properties.length > 0 &&
        properties.map((property) => (
          <Link to={'/property/'+property._id} key={property._id}>
            <div className="flex bg-gray-500 rounded-2xl mb-2">
              {property.photos?.length > 0 && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + property.photos[0]}
                  alt="property photo"
                />
              )}
            </div>
            <h2 className="font-bold">
              {property.address}
            </h2>
            <h3 className="text-md truncate text-gray-500">
              {property.title}
            </h3>

            <div className="text-sm text-left mt-2">
              <span className="font-bold"> ${property.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
