import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {authContext?.user?.email}</p>
      <p>Role: {authContext?.user?.role}</p>
    </div>
  );
};

export default Dashboard;
