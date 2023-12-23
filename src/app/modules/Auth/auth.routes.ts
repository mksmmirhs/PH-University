import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(UserRole.admin, UserRole.faculty, UserRole.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);
router.post(
  '/reset-password',
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

export const AuthRoutes = router;
