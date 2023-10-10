import PropTypes from 'prop-types';

/* The code is defining a functional component called `Mensaje`. This component takes two props,
`children` and `tipo`. Inside the component, it returns a `<div>` element with a class name of
`alerta` followed by the value of `tipo`. The content of the `<div>` is the value of `children`. */
const Mensaje = ({ children, tipo }) => {
  return <div className={`alerta ${tipo}`}>{children}</div>;
};

Mensaje.propTypes = {
  children: PropTypes.string,
  tipo: PropTypes.string,
};

export default Mensaje;
