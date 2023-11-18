import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import useCourseApi from '../../apis/useCourseApi';
import styles from './Course.module.scss';
import Icon from '../../icons/Icon';
import Accordian from '../../components/Accordian/Accordian';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';

const Course = () => {
  const { course_id } = useParams();
  const { user, updateUser } = useAuth();
  console.log(user);

  const { loading, error, getCourseDetails, enrollInCourse, markAsCompleted } = useCourseApi();

  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    getCourseDetails(course_id, (data) => {
      setCourseDetails(data.data[0]);
    });
  }, [course_id]);

  const enroll = async () => {
    await enrollInCourse(course_id, (data) => {
      updateUser();
    });
  };
  const mark = async () => {
    await markAsCompleted(course_id, (data) => {
      updateUser();
    });
  };
  return (
    <div className={styles.container}>
      <Navbar />
      {courseDetails && (
        <div className={styles.details}>
          <img src={courseDetails.thumbnail} alt="" />
          <h1>{courseDetails.name}</h1>
          <p>{courseDetails.description}</p>
          <div>
            Created By : {courseDetails.instructor} , Status : {courseDetails.enrollmentStatus}{' '}
          </div>
          <div>
            <Icon name="location" size={20} /> {courseDetails.location} ,{' '}
            <Icon name="calendar" size={20} /> {courseDetails.duration}, {courseDetails.schedule}
          </div>
          <h3>Syllabus</h3>
          <div className={styles.syllabus}>
            {courseDetails.syllabus.map((item) => {
              return <Accordian key={item.week} data={item} />;
            })}
          </div>
          {!user.courses.includes(course_id) && !user.completed_courses.includes(course_id) && (
            <Button onClick={enroll} loading={loading}>
              Enroll For the Course
            </Button>
          )}
          {user.courses.includes(course_id) && (
            <Button onClick={mark} loading={loading}>
              Mark the Course Completed
            </Button>
          )}
          {user.completed_courses.includes(course_id) && (
            <p className={styles.completed}>Course Completed</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Course;
