import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaListOl } from "react-icons/fa";
import { MdOutlineHomeWork } from "react-icons/md";

const AccountNav = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  let activePage = pathname.split("/")?.[2];
  console.log(activePage);
  if (activePage === "") {
    activePage = "profile";
  }

  function linkClasses(type = null) {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
    if (type === activePage) {
      classes += " bg-primary text-white";
    } else {
      classes += " bg-red-100";
    }
    return classes;
  }

  return (
    <>
      <nav className="w-full flex justify-center mt-8 gap-5 mb-8">
        <Link className={linkClasses("profile")} to={"/account/"}>
          <CgProfile className="w-6 h-6" />
          Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          <FaListOl className="w-6 h-6" />
          Bookings
        </Link>
        <Link className={linkClasses("properties")} to={"/account/properties"}>
          <MdOutlineHomeWork className="w-6 h-6" />
          My Properties
        </Link>
      </nav>
    </>
  );
};

export default AccountNav;
