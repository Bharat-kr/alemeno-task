import React, { useState } from 'react';
import Icon from '../../icons/Icon';
import styles from './Accordian.module.scss';

const Accordian = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.accordian}>
      <div
        className={styles.top}
        onClick={() => {
          setOpen((prev) => {
            return !prev;
          });
        }}>
        <p>
          Week {data.week} : {data.topic}
        </p>
        <Icon name="down" rotate={open ? 180 : 0} />
      </div>
      {open && <div className={styles.bottom}>{data.content}</div>}
    </div>
  );
};

export default Accordian;
