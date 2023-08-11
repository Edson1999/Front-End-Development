import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Texto = styled.div`
  background-color: #dc3545;
  color: white;
  padding: 0.8rem 1.6rem;
  font-size: 1.6rem;
  font-family: 'Canaro', sans-serif;
`;

const Error = ({ children }) => {
  return <Texto>{children}</Texto>;
};

Error.propTypes = {
  children: PropTypes.string,
};

export default Error;
