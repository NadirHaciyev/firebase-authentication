import { useState, createContext, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword, modify, login, fetchMe, logout, register } from "../firebase";

import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchMe.then((me) => {
      setUser(me);
      setIsLoading(false);
    });
  }, []);

  const update = async (full_name, url) => {
    try {
      const result = await modify(full_name, url);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const updatePassword = async (password) => {
    try {
      const result = await changePassword(password);
      navigate("/");
      console.log("update-password-success");
    } catch (e) {
      console.log("update-password-error", e);
      if (e.code === "auth/requires-recent-login") {
        setModal(true);
      }
    }
  };

  const signup = async (email, password, full_name) => {
    try {
      const result = await register(email, password, full_name);
      console.log("result :>> ", result);
      navigate("/");
      setUser(result);
    } catch (e) {
      toast.error(e);
    }
  };

  const signin = async (email, password) => {
    try {
      const result = await login(email, password);
      if (!result) throw "Sifre ve ya parola yanlis";
      console.log("result :>> ", result);
      navigate("/");
      setUser(result);
    } catch (e) {
      toast.error(e);
    }
  };

  const signOut = async () => {
    try {
      await logout();
      setUser(false);
    } catch (e) {
      console.log(e);
    }
  };

  const values = {
    user,
    signOut,
    update,
    signin,
    updatePassword,
    modal,
    setModal,
    signup
  };

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 font-bold text-4xl">
        Loading...
      </div>
    );
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
