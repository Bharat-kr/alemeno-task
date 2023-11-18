import { useState } from 'react';
import axios from 'axios';

const useLoginApi = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async (input, cb) => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/user/login', input);
      if (res.status !== 200) throw new Error(res.msg || 'Some error occured, please try again');
      if (cb && typeof cb === 'function') cb(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const signup = async (input, cb) => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/user/signup', input);
      if (res.status !== 200) throw new Error(res.msg || 'Some error occured, please try again');
      if (cb && typeof cb === 'function') cb(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, login, signup };
};

export default useLoginApi;
