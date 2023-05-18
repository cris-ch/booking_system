import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PropertiesPage from "./PropertiesPage";

import AccountNav from "../components/AccountNav";

const ProfilePage = () => {
  const { user, setUser, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  async function deleteAccount() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      try {
        await axios.delete("/delete-account");
        setUser(null);
        setRedirect("/");
      } catch (error) {
        console.error(error);
      }
    }
  }

  if (!ready) return <div>Loading...</div>;

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as user {user.name} ({user.email})
          <button className="primary max-w-xs mt-2" onClick={logout}>
            Logout
          </button>
          <button className="primary max-w-xs mt-2" onClick={deleteAccount}>
            Delete Account
          </button>
        </div>
      )}
      {subpage === "properties" && <PropertiesPage />}
    </div>
  );
};

export default ProfilePage;
