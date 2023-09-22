import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="px-2 py-2 bg-white border-b">
      <div className="md:flex md:justify-between items-center">
        <h2 className="text-4xl text-sky-600 font-black text-center">UpTask</h2>
        <input
          type="search"
          placeholder="Buscar proyecto"
          className="rounded-3xl lg:w-96 block  py-2 px-4 border"
        />
        <div className="flex items-center gap-4">
          <Link to="/projects" className="">
            Proyectos
          </Link>
          <button className="text-white bg-sky-600 text-sm py-2 px-4 rounded-3xl ">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
