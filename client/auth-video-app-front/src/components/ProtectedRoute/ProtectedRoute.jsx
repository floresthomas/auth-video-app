import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("userToken");
  if (isAuthenticated) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};
