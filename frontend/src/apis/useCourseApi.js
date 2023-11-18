import { useState } from 'react';
import axios from 'axios';

const useCourseApi = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getAllCourses = async (input, cb) => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.get(`/course/${input}`);
      if (res.status !== 200) throw new Error(res.msg || 'Some error occured, please try again');
      if (cb && typeof cb === 'function') cb(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const getCourseDetails = async (input, cb) => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.get(`/course/${input}`);
      if (res.status !== 200) throw new Error(res.msg || 'Some error occured, please try again');
      if (cb && typeof cb === 'function') cb(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const enrollInCourse = async (input, cb) => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`/course/enroll/${input}`);
      if (res.status !== 200) throw new Error(res.msg || 'Some error occured, please try again');
      if (cb && typeof cb === 'function') cb(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const getEnrolledCourses = async (cb) => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.get(`/course/get_enrolled_courses`);
      if (res.status !== 200) throw new Error(res.msg || 'Some error occured, please try again');
      if (cb && typeof cb === 'function') cb(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const markAsCompleted = async (input, cb) => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`/course/mark_as_completed/${input}`);
      if (res.status !== 200) throw new Error(res.msg || 'Some error occured, please try again');
      if (cb && typeof cb === 'function') cb(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    getAllCourses,
    getCourseDetails,
    enrollInCourse,
    getEnrolledCourses,
    markAsCompleted
  };
};

export default useCourseApi;
