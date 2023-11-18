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
  }
];

export default STUDENT_ROUTES;
