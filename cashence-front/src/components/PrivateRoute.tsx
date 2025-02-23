import { Navigate } from "react-router-dom";
import { JSX, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const authContext = useContext(AuthContext);
  return authContext?.user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
