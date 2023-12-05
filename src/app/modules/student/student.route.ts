import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidation } from './student.validation';
const router = express.Router();

router.get('/', StudentController.getAllStudent);
router.get('/:studentId', StudentController.findStudentById);
router.patch(
  '/:studentId',
  validateRequest(studentValidation.updateStudentValidationSchema),
  StudentController.updateStudentIntoDb
);
router.delete('/:studentId', StudentController.deleteStudentById);

export const StudentRoutes = router;
