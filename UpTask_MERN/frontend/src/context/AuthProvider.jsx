import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axiosClient from '../config/axiosClient';
import AuthContext from './contextConfig';

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axiosClient('/users/profile', config);
        setAuth(data);
      } catch (error) {
        setAuth({});
      } finally {
        setLoading(false);
      }
    };
    authenticateUser();
    //? useEffect has a missing dependency...?
  }, []);

  const closeSesionAuth = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, closeSesionAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object,
};

export { AuthProvider };

export default AuthContext;
