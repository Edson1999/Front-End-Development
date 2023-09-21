import PropTypes from 'prop-types';
import { useState, useEffect, createContext } from 'react';

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.object,
};

export { AuthProvider };

export default AuthContext;
