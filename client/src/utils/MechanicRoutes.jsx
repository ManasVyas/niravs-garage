import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isObjEmpty } from "./isObjEmpty";

const MechanicRoutes = () => {
  const auth = useSelector((state) => state.auth);
  return isObjEmpty(auth.loggedInUser) ? (
    <Navigate to="/login" />
  ) : auth.loggedInUser.role === "admin" ||
    auth.loggedInUser.role === "mechanic" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default MechanicRoutes;
