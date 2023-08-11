import PropTypes from 'prop-types';

const Error = ({ children }) => {
  return <div className="py-2 text-red-600 font-semibold">{children}</div>;
};

Error.propTypes = {
  children: PropTypes.object,
};

export default Error;
