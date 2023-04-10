import "./App.css";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./pages/ProfilePage";
import PropertiesPage from "./pages/PropertiesPage";
import PropertiesFormPage from "./pages/PropertiesFormPage";
import PropertyPage from "./pages/PropertyPage";


axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/properties" element={<PropertiesPage />} />
          <Route
            path="/account/properties/new"
            element={<PropertiesFormPage />}
          />
          <Route
            path="/account/properties/:id"
            element={<PropertiesFormPage />}
          />
          <Route path="/property/:id" element={<PropertyPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
