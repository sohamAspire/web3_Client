import React from "react";
import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedIn, children, isLoged }) => {
  if (isLoggedIn === false || isLoged === false || isLoged === null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default Protected;
