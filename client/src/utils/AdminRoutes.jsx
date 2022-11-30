import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isObjEmpty } from "./isObjEmpty";

const AdminRoutes = () => {
  const auth = useSelector((state) => state.auth);
  return isObjEmpty(auth.loggedInUser) ? (
    <Navigate to="/login" />
  ) : auth.loggedInUser.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoutes;
