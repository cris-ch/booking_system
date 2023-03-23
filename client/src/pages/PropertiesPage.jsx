import React from "react";
import { Link, useParams } from "react-router-dom";
import NewPropertyForm from "../NewPropertyForm";
import { MdOutlineExposurePlus1 } from "react-icons/md";
import AccountNav from "../AccountNav";

const PropertiesPage = () => {
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
    </div>
  );
};

export default PropertiesPage;
