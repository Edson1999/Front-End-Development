import PropTypes from 'prop-types';

/**
 * The Error component is a React component that renders a div with red text and a bold font,
 * displaying the provided children.
 * @returns The Error component is returning a div element with the class name "py-2 text-red-600
 * font-semibold" and the children prop as its content.
 */
const Error = ({ children }) => {
  return <div className="py-2 text-red-600 font-semibold">{children}</div>;
};

Error.propTypes = {
  children: PropTypes.object,
};

export default Error;
