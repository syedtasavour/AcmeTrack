// src/routes/PublicRoute.jsx
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return !isLoggedIn ? children : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
