import Course from '../../pages/Course/Course';
import Courses from '../../pages/Courses/Courses';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Home from '../../pages/Home/Home';

const STUDENT_ROUTES = [
  {
    link: '/',
    name: 'User home',
    component: <Home />
  },
  {
    link: '/dashboard',
    name: 'User Dashboard',
    component: <Dashboard />
  },
  {
    link: '/courses',
    name: 'All Courses',
    component: <Courses />
  },
  {
    link: '/course/:course_id',
    name: 'Specific Course',
    component: <Course />
  }
];

export default STUDENT_ROUTES;
