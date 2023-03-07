import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
  const { user, setUser, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/")
    setUser(null);

  }

  if (!ready) return <div>Loading...</div>;

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  function linkClasses(path = null) {
    let classes = "py-2 px-6";
    if (subpage === path) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-5 mb-8">
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
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as user {user.name} ({user.email})
          <button className="primary max-w-xs mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
