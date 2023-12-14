import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import Loader from '../components/Loader';
import useAuth from '../hooks/useAuth';

import './Layout.scss';

const ProtectedRoutes = () => {
  const { auth, loading } = useAuth();

  if (loading) return <Loader />;
  return (
    <>
      {auth._id ? (
        <div className="bg-gray-300">
          {/* <Navbar /> */}
          <Navbar />
          {/* TODO: Responsive Area md:min-h-screen */}
          <div className="md:flex main_layout">
            <Sidebar />
            <main className="flex-1">
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
