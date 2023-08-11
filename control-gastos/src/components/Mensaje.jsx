import PropTypes from 'prop-types';

const Mensaje = ({ children, tipo }) => {
  return <div className={`alerta ${tipo}`}>{children}</div>;
};

Mensaje.propTypes = {
  children: PropTypes.string,
  tipo: PropTypes.string,
};

export default Mensaje;
