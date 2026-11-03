import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';

function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main className="route-loading" aria-live="polite">
        <span className="loading-mark">m.</span>
        <span>Getting your music space ready…</span>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
