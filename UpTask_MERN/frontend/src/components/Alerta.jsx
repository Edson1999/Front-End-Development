import PropTypes from 'prop-types';

const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error ? 'from-red-400 to-red-600' : 'from-green-400 to-green-600'
      } bg-gradient-to-r text-center p-3 rounded-3xl text-white my-10`}
    >
      {alerta.msg}
    </div>
  );
};

Alerta.propTypes = {
  alerta: PropTypes.object,
};

export default Alerta;
