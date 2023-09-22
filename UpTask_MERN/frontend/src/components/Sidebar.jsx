import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <aside className="md:w-60 lg:w-64 px-4 py-4 bg-white ">
      <p className="">
        Hola: <span className="font-semibold">{auth.name}</span>
      </p>
      <Link
        to="create-project"
        className="w-full block rounded-3xl my-2 py-2 px-4 font-semibold text-blue-600 hover:bg-gray-100"
      >
        Crear Proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;
