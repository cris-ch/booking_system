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
      <h1 className="text-xl">{property.title}</h1>
      <a target="_blank" href={"https://maps.google.com/?q="+property.address}>{property.address}</a>
    </div>
  );
};

export default PropertyPage;
