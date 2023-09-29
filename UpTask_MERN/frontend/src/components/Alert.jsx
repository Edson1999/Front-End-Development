import PropTypes from 'prop-types';

const Alert = ({ alert }) => {
  return (
    <div
      className={`${
        alert.error ? 'from-red-400 to-red-600' : 'from-green-400 to-green-600'
      } bg-gradient-to-r text-center p-3 rounded-xl text-white my-4`}
    >
      {alert.msg}
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.object,
};

export default Alert;
