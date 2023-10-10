import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import btnCerrarModal from '../img/cerrar.svg';
import Mensaje from './Mensaje';

/**
 * The `Modal` component is a form that allows users to add or edit expenses, with fields for name,
 * amount, category, and date.
 * @returns The code is returning a JSX element that represents a modal component. The modal component
 * contains a form with input fields for entering the name, quantity, and category of an expense. It
 * also includes a submit button for saving the expense. The modal component also has a close button
 * and a message component for displaying error messages.
 */
const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar,
}) => {
  const [mensaje, setMensaje] = useState('');
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setFecha(gastoEditar.fecha);
      setId(gastoEditar.id);
    }
  }, [gastoEditar]);

  /**
   * The function `handleCerrarModal` sets the `animarModal` state to `false`, resets the `gastoEditar`
   * state to an empty object, and then sets the `modal` state to `false` after a delay of 500
   * milliseconds.
   */
  const handleCerrarModal = () => {
    setAnimarModal(false);
    setGastoEditar({});

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  /**
   * The handleSubmit function is used to handle form submission and validate that all required fields
   * are filled in.
   * @returns If any of the fields (nombre, cantidad, categoria) are empty, the function will return
   * early and not execute the code after the return statement.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, cantidad, categoria].includes('')) {
      setMensaje('Todos los campos son obligatorios *');

      setTimeout(() => {
        setMensaje('');
      }, 2000);
      return;
    }

    guardarGasto({ nombre, cantidad, categoria, fecha, id });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={btnCerrarModal}
          alt="Cerrar Modal"
          onClick={handleCerrarModal}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
      >
        <legend>{gastoEditar.id ? 'Editar gasto' : 'Nuevo Gasto'}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre del Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="nombre">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade la cantidad: ejemplo: 300"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Filtrar Gastos</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione una opción --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input
          type="submit"
          value={gastoEditar.id ? 'Guardar cambios' : 'Añadir gasto'}
        />
      </form>
    </div>
  );
};

Modal.propTypes = {
  setModal: PropTypes.func,
  animarModal: PropTypes.bool,
  setAnimarModal: PropTypes.func,
  guardarGasto: PropTypes.func,
  gastoEditar: PropTypes.object,
  setGastoEditar: PropTypes.func,
};

export default Modal;
