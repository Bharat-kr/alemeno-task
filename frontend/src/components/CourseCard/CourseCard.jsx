import React from 'react';
import styles from './CourseCard.module.scss';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.card}
      onClick={() => {
        navigate(`/course/${data._id}`);
      }}>
      <img src={data.thumbnail} alt="" />
      <h3>{data.name}</h3>
      <p>{data.instructor}</p>
      <p>{data.location}</p>
    </div>
  );
};
    
export default CourseCard;
