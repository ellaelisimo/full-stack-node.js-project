import { Navigate } from "react-router-dom";

export const Logout = () => {
  localStorage.removeItem("token");
  return <Navigate to={"/login"} />;
};
