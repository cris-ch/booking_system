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
  return <div className="mt-8 ">
    {property && (
      <h1>{property.title}</h1>
    )}
  </div>;
};

export default PropertyPage;
