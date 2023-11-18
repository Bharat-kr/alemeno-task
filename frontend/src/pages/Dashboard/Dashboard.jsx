import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Dashboard.module.scss';
import useCourseApi from '../../apis/useCourseApi';
import CourseCard from '../../components/CourseCard/CourseCard';

const Dashboard = () => {
  const { loading, error, getEnrolledCourses } = useCourseApi();
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    getEnrolledCourses((data) => {
      console.log(data);
      setCourseData(data.data);
    });
  }, []);
  return (
    <div className={styles.dashboard}>
      <Navbar />
      <div className={styles.top}>
        <h4>All Courses</h4>
      </div>
      <div className={styles.cards}>
        {courseData.map((item) => {
          return <CourseCard key={item.name} data={item} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
