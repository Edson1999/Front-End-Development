import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import Loader from '../components/Loader/Loader';
import useAuth from '../hooks/useAuth';

import './Layout.scss';

const ProtectedRoutes = () => {
  const { auth, loading } = useAuth();

  if (loading) return <Loader />;
  return (
    <>
      {auth._id ? (
        <div className="bg-gray-300 app-container">
          <Navbar />
          <div className="main-content">
            <Sidebar />
            <main className="display-content">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtectedRoutes;
