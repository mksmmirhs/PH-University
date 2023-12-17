import express from 'express';

import { SemesterRegistrationController } from './semesterRegistration.controller';

import validateRequest from '../../middleware/validateRequest';
import { semesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidation.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationController.createSemesterRegistration
);

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration
);

// router.patch(
//   '/:id',
//   validateRequest(
//     SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema
//   ),
//   SemesterRegistrationController.updateSemesterRegistration
// );

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration
);

router.delete(
  '/:id',
  SemesterRegistrationController.deleteSemesterRegistration
);

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

export const semesterRegistrationRoutes = router;
