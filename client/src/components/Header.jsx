import React, { useContext } from "react";
import { Link } from "react-router-dom";
import aPlusLogo from "../assets/logo.svg";
import { UserContext } from "../UserContext";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import SearchBar from "./SearchBar";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="flex items-center justify-between mt-3">
      <Link to={"/"} className="flex items-center gap-1">
        <img src={aPlusLogo} className="h-10" alt="A Plus Logo" />
        <span className="font-bold text-xl">APlus Booking</span>
      </Link>
      <SearchBar />
      <Link
        to={user ? "/account" : "/login"}
        className="flex gap-2 border border-color-gray-300 rounded-full py-2 px-4 items-center"
      >
        <AiOutlineMenu />
        <div>
          <HiOutlineUserCircle className="w-6 h-6 bg-primary text-white rounded-full" />
        </div>
        {user ? (
          <div className="flex flex-row">
            <div className="font-bold">Welcome, {user.name}</div>
          </div>
        ) : (
          <div className="font-bold">Login</div>
        )}
      </Link>
    </header>
  );
};

export default Header;
