import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  if (requireAdmin && currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
