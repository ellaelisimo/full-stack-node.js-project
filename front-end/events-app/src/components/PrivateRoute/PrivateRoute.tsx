import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: any) => {
  const token = localStorage.getItem("token");
  const isLoggedIn = token ? true : false;

  if (!isLoggedIn) {
    localStorage.setItem("redirect", window.location.pathname);
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
