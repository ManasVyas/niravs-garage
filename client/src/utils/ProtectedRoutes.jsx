import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isObjEmpty } from "./isObjEmpty";

const ProtectedRoutes = () => {
  const auth = useSelector((state) => state.auth);
  return isObjEmpty(auth.loggedInUser) ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoutes;
