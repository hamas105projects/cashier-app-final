import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';

const PrivateRoute = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    const verifyAuth = async () => {
      const isValid = await checkAuth();
      setIsAuthenticated(isValid);
      setIsChecking(false);
    };
    verifyAuth();
  }, [checkAuth]);

  if (isChecking) {
    // Tampilkan loading (Anda bisa custom sesuai style Anda)
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;