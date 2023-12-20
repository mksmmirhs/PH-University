import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidation } from './student.validation';
const router = express.Router();

router.get('/', StudentController.getAllStudent);
router.get('/:id', StudentController.findStudentById);
router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentValidationSchema),
  StudentController.updateStudentIntoDb,
);
router.delete('/:id', StudentController.deleteStudentById);

export const StudentRoutes = router;
