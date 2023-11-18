import React, { useRef, useState } from 'react';
import styles from './Navbar.module.scss';
import Icon from '../../icons/Icon';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import useOutsideClickHandler from '../../hooks/useOutsideClickHandler';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const { user, setUser, setAuthenticated } = useAuth();

  useOutsideClickHandler(
    ref,
    () => {
      setOpen(false);
    },
    false
  );
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAuthenticated(false);
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.top}>
        <h2>Course.Study</h2>
        <div className={styles.person} ref={ref}>
          <Icon
            name="person"
            size={40}
            onClick={() => {
              setOpen(true);
            }}
          />
          {open && (
            <div className={styles.float}>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/courses">Explore Courses</Link>
              <Button onClick={logout}>Logout</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
