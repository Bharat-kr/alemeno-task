import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLoginApi from '../apis/useLoginApi';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const { getUser } = useLoginApi();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        updateUser();
        setLoading(false);
        setAuthenticated(true);
      } else {
        setLoading(false);
        setAuthenticated(false);
      }
    };
    init();
  }, [token]);

  const updateUser = async () => {
    await getUser((data) => {
      setUser((prev) => {
        return { ...prev, ...data.data };
      });
    });
  };

  useEffect(() => {
    if (authenticated === false) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  return (
    <>
      {!loading && user ? (
        <AuthContext.Provider
          value={{ user, setUser, authenticated, setAuthenticated, updateUser }}>
          {children}
        </AuthContext.Provider>
      ) : (
        'Loading'
      )}
    </>
  );
};
export default AuthProvider;
