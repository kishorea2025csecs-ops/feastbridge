import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import RestaurantDashboard from "./RestaurantDashboard";
import NgoDashboard from "./NgoDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "restaurant") return <RestaurantDashboard />;
  return <NgoDashboard />;
};

export default Dashboard;
