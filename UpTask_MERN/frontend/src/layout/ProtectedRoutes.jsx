import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import useAuth from '../hooks/useAuth';

const ProtectedRoutes = () => {
  const { auth, loading } = useAuth();

  if (loading) return <Loader />;
  return (
    <>
      {auth._id ? (
        <div className="bg-gray-300">
          <Navbar />
          <div className="md:flex md:min-h-screen">
            <Sidebar />
            <main className="m-3 p-4 flex-1 bg-white rounded-3xl">
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
