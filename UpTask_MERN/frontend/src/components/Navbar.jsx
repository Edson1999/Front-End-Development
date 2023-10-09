import useAuth from '../hooks/useAuth';
import useProjects from '../hooks/useProjects';

const Navbar = () => {
  const { signOut } = useProjects();
  const { closeSesionAuth } = useAuth();

  const handleCloseSesion = () => {
    closeSesionAuth();
    signOut();
    localStorage.removeItem('token');
  };

  return (
    <header className="px-2 py-2 bg-white">
      <div className="md:flex md:justify-between items-center">
        <h2 className="text-4xl text-blue-700 font-black text-center mb-5 md:mb-0">
          UpTask
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* <Link
            to="/projects"
            className="block rounded-3xl py-2 px-4  font-semibold hover:bg-gray-100"
          >
            Proyectos
          </Link> */}
          <button
            onClick={handleCloseSesion}
            className="text-white bg-sky-600 text-sm py-2 px-4 rounded-3xl "
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
