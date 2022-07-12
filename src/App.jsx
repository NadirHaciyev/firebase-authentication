import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./context/authContext";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Registration from "./pages/Auth/Registration";
import UpdatePassword from "./pages/Auth/UpdatePassword";
import UpdateUser from "./pages/Auth/UpdateUser";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  const { loading } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/update-user" element={<UpdateUser />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
