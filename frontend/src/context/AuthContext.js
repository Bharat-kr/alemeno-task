import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (user) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user?.accessToken}`;
        setLoading(false);
        setAuthenticated(true);
      } else {
        setLoading(false);
        setAuthenticated(false);
      }
    };
    init();
  }, [user]);

  useEffect(() => {
    if (authenticated === false) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);
  console.log(loading, authenticated);

  return (
    <AuthContext.Provider value={{ user, setUser, authenticated }}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
