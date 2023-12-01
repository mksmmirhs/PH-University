import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/student',
    route: StudentRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
