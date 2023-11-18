import { useEffect, useState } from 'react';

//components
import Button from '../../components/Button/Button';
import styles from './Home.module.scss';
import Input from '../../components/Input/Input';
import useLoginApi from '../../apis/useLoginApi';
import { useActionData, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const initialData = {
  email: '',
  password: '',
  name: ''
};
const Home = () => {
  const navigate = useNavigate();
  const [state, setState] = useState('login');
  const [data, setData] = useState(initialData);
  const { loading, login, signup, error } = useLoginApi();
  const { authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      navigate('/dashboard');
    }
  }, [authenticated]);

  const buttonHandler = async () => {
    if (state === 'login') {
      await login(data, (res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/dashboard');
      });
    } else {
      await signup(data, (res) => {
        console.log(res);
      });
    }
  };
  return (
    <div className={styles.home}>
      <div className={styles.inner}>
        <h1>{state === 'login' ? 'Login' : 'Signup'}</h1>
        {state === 'signup' && (
          <div className={styles.inputs}>
            <h3>Name</h3>
            <Input
              type="text"
              name="name"
              onChange={(e) => {
                setData((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
              value={data.name}
            />
          </div>
        )}
        <div className={styles.inputs}>
          <h3>Email</h3>
          <Input
            type="email"
            name="email"
            onChange={(e) => {
              setData((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
            value={data.email}
          />
        </div>
        <div className={styles.inputs}>
          <h3>Password</h3>
          <Input
            type="password"
            name="email"
            onChange={(e) => {
              setData((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
            value={data.password}
          />
        </div>
        <p>
          {state === 'login' ? "Don't Have and Account " : 'Already Have an Account '}
          <span
            onClick={() => {
              if (state === 'login') {
                setState('signup');
              } else {
                setState('login');
              }
              setData({
                name: '',
                email: '',
                password: ''
              });
            }}>
            {state === 'login' ? 'Create One' : 'Login Here'}
          </span>
        </p>
        <Button theme="dark" onClick={buttonHandler} loading={loading}>
          {state === 'login' ? 'Login' : 'Signup'}
        </Button>
      </div>
    </div>
  );
};

export default Home;
