import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";

const AccountPage = () => {
  const { user, ready } = useContext(UserContext);

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) return <div>Loading...</div>;

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  function linkClasses(path = null) {
    let classes = "py-2 px-6";
    if (subpage === path) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-5">
        <Link className={linkClasses("profile")} to={"/account/"}>
          Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          Bookings
        </Link>
        <Link className={linkClasses("properties")} to={"/account/properties"}>
          Properties
        </Link>
      </nav>
    </div>
  );
};

export default AccountPage;
