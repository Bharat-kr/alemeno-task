import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Courses.module.scss';
import CourseCard from '../../components/CourseCard/CourseCard';
import useCourseApi from '../../apis/useCourseApi';
import Input from '../../components/Input/Input';

const Courses = () => {
  const { loading, error, getAllCourses } = useCourseApi();
  const [courseData, setCourseData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllCourses(page, (data) => {
      setPage((prev) => {
        return prev + 1;
      });
      setCourseData(data.data);
    });
  }, []);

  const seeMore = async () => {
    await getAllCourses(page, (data) => {
      console.log(data);
      setPage((prev) => {
        return prev + 1;
      });
      if (data.data.length > 0) {
        setCourseData((prev) => {
          return [...prev, data.data];
        });
      }
    });
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.top}>
        <h4>All Courses</h4>
        <Input type="search" name="search" onChange={() => {}} />
      </div>
      <div className={styles.cards}>
        {courseData.map((item) => {
          return <CourseCard key={item.name} data={item} />;
        })}
      </div>
      <div className={styles.bottom}>
        <span onClick={seeMore}>See More</span>
      </div>
    </div>
  );
};

export default Courses;
