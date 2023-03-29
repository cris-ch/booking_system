import { useEffect, useState } from "react";
import axios from "axios";
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
          <div key={property._id}>
            <div className="flex bg-gray-500 rounded-2xl mb-2">
              {property.photos?.length > 0 && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + property.photos[0]}
                  alt="property photo"
                />
              )}
            </div>
            <h2 className="text-sm text-left truncate leading-3">{property.title}</h2>
            <h3 className="text-sm text-left font-bold mt-1 leading-3">{property.address}</h3>
            <h3 className="text-sm text-left mt-1 leading-3">{`$${property.price}`}</h3>
          </div>
        ))}
    </div>
  );
};

export default IndexPage;
