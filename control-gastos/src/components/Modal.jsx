import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import btnCerrarModal from '../img/cerrar.svg';
import Mensaje from './Mensaje';

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

  const handleCerrarModal = () => {
    setAnimarModal(false);
    setGastoEditar({});

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

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
