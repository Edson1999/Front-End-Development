import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

/* The code defines a React component called `Paciente`. It receives three props: `paciente`,
`setPaciente`, and `eliminarPaciente`. */
const Paciente = ({ paciente, setPaciente, eliminarPaciente }) => {
  const { nombre, propietario, email, fecha, sintomas, id } = paciente;

  /**
   * The function `handleEliminar` displays a confirmation dialog using the Swal library and if the
   * user confirms, it shows a success message and calls the `eliminarPaciente` function with the `id`
   * parameter.
   */
  const handleEliminar = () => {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Estás seguro de eliminar al paciente?',
      icon: 'warning',
      iconColor: '#E0A800',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', 'El paciente ha sido dado de alta.', 'success');
        eliminarPaciente(id);
      }
    });
  };

  return (
    <div className="mx-5 my-4 bg-white rounded-3xl px-5 py-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-3xl">
          <img className="rounded-3xl" src="/mascota.jpg"></img>
        </div>
        <div className="grid justify-center items-center">
          <p className="font-bold mb-3 text-gray-700">
            Nombre: <span className="font-normal text-black">{nombre}</span>
          </p>
          <p className="font-bold mb-3 text-gray-700">
            Propietario:{' '}
            <span className="font-normal text-black">{propietario}</span>
          </p>
          <p className="font-bold mb-3 text-gray-700">
            Email: <span className="font-normal text-black">{email}</span>
          </p>
          <p className="font-bold mb-3 text-gray-700">
            Fecha Alta: <span className="font-normal text-black">{fecha}</span>
          </p>
          <p className="font-bold mb-3 text-gray-700">
            Síntomas: <span className="font-normal text-black">{sintomas}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          className="py-2 px-6 bg-indigo-600 hover:bg-indigo-700 rounded-3xl text-white"
          onClick={() => setPaciente(paciente)}
        >
          Editar
        </button>
        <button
          className="py-2 px-6 bg-red-600 hover:bg-red-700 rounded-3xl text-white"
          type="button"
          onClick={handleEliminar}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

Paciente.propTypes = {
  paciente: PropTypes.object,
  nombre: PropTypes.string,
  propietario: PropTypes.string,
  email: PropTypes.string,
  fecha: PropTypes.string,
  sintomas: PropTypes.string,
  setPaciente: PropTypes.func,
  eliminarPaciente: PropTypes.func,
  id: PropTypes.number,
};

export default Paciente;
