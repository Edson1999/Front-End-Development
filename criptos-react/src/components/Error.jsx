import PropTypes from 'prop-types';
import styled from '@emotion/styled';

/* The code `const Texto = styled.div` is creating a styled component called `Texto`. This component is
a `div` element that has specific styles applied to it. The styles include a background color of
`#dc3545`, white text color, padding of `0.8rem` on the top and bottom and `1.6rem` on the left and
right, a font size of `1.6rem`, and a font family of `'Canaro', sans-serif`. This styled component
can then be used in the `Error` component to style the rendered `div` element. */

const Texto = styled.div`
  background-color: #dc3545;
  color: white;
  padding: 0.8rem 1.6rem;
  font-size: 1.6rem;
  font-family: 'Canaro', sans-serif;
`;

/**
 * The above function is a React component called Error that takes in a children prop and returns a
 * Texto component with the children as its content.
 * @returns The Error component is returning the children wrapped in a Texto component.
 */
const Error = ({ children }) => {
  return <Texto>{children}</Texto>;
};

Error.propTypes = {
  children: PropTypes.string,
};

export default Error;
