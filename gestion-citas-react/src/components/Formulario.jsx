import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';
import Swal from 'sweetalert2';

/**
 * The `Formulario` component is a form that allows users to add or edit patient data, with form
 * validation and success messages.
 * @returns The `Formulario` component returns a form that allows users to add or edit patient data. It
 * includes input fields for the patient's name, owner's name, email, date of admission, and symptoms.
 * The form also includes a submit button that displays "Guardar Cambios" (Save Changes) if the form is
 * in edit mode, or "Agregar Pacientes" (Add Patients) if the
 */
const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
effect is triggered whenever the `paciente` prop changes. */
  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  /**
   * The `generarID` function generates a unique ID by combining a random string with the current
   * timestamp.
   * @returns The function `generarID` returns a string that is a combination of a random alphanumeric
   * string and the current timestamp.
   */
  const generarID = () => {
    const fecha = Date.now().toString();
    const random = Math.random().toString(36).substring(2);
    return random + fecha;
  };

  /**
   * The handleSubmit function is used to handle form submission in a React application, where it
   * validates the form inputs, updates the state with the new data, and displays success messages.
   * @returns The function does not return anything.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true);
      return;
    }
    setError(false);

    // Objeto de paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    };

    if (paciente.id) {
      // Modo de edición

      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState
      );
      setPacientes(pacientesActualizados);
      setPaciente({});

      Swal.fire({
        icon: 'success',
        toast: true,
        title: 'Datos actualizados con éxito',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // Nuevo registro
      objetoPaciente.id = generarID();
      setPacientes([...pacientes, objetoPaciente]);
      Swal.fire({
        icon: 'success',
        toast: true,
        title: 'Cliente registrado con éxito',
        showConfirmButton: false,
        timer: 1500,
      });
    }

    // Reiniciar el formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Formulario</h2>
      <p className="text-lg mt-4 text-center mb-10">
        Añade pacientes y{' '}
        <span className="text-indigo-600 font-bold ">Administralos</span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-3xl py-10 px-5 mb-10 "
      >
        {error && (
          <Error>
            <p>*Todos los campos son requeridos</p>
          </Error>
        )}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 font-bold">
            Nombre Mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="rounded-3xl border-2 w-full p-2 px-4 mt-2 placeholder-gray-400"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 font-bold"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del propietario"
            className="rounded-3xl border-2 w-full p-2 px-4 mt-2 placeholder-gray-400"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 font-bold">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="E-mail de contacto"
            className="rounded-3xl border-2 w-full p-2 px-4 mt-2 placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 font-bold">
            Alta
          </label>
          <input
            id="alta"
            type="date"
            className="rounded-3xl border-2 w-full p-2 px-4 mt-2 placeholder-gray-400"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 font-bold">
            Síntomas
          </label>
          <textarea
            id="sintomas"
            placeholder="Describe los síntomas"
            className="rounded-3xl border-2 w-full p-2 px-4 mt-2 placeholder-gray-400"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-2 rounded-3xl text-white hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente.id ? 'Guardar Cambios' : 'Agregar Pacientes'}
        />
      </form>
    </div>
  );
};

Formulario.propTypes = {
  pacientes: PropTypes.array,
  setPacientes: PropTypes.func,
  paciente: PropTypes.object,
  setPaciente: PropTypes.func,
};

export default Formulario;
