import PropTypes from 'prop-types';
import Paciente from './Paciente';

/* The code is defining a functional component called `ListadoPacientes`. This component takes in three
props: `pacientes`, `setPaciente`, and `eliminarPaciente`. */
const ListadoPacientes = ({ pacientes, setPaciente, eliminarPaciente }) => {
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen md:overflow-y-scroll">
      {pacientes && pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
          <p className="text-lg mt-4 text-center mb-10">
            Administra tus{' '}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>
          {pacientes.map((paciente) => (
            <Paciente
              key={paciente.id}
              paciente={paciente}
              setPaciente={setPaciente}
              eliminarPaciente={eliminarPaciente}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">
            Actualmente no hay pacientes
          </h2>
          <p className="text-lg mt-4 text-center mb-10">
            Prueba agregando unos y se mostraran{' '}
            <span className="text-indigo-600 font-bold">aquí</span>
          </p>
        </>
      )}
    </div>
  );
};

ListadoPacientes.propTypes = {
  pacientes: PropTypes.array,
  setPaciente: PropTypes.func,
  eliminarPaciente: PropTypes.func,
};

export default ListadoPacientes;
