import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();

router.get('/', StudentController.getAllStudent);
router.get('/:studentId', StudentController.findStudentById);
router.delete('/:studentId', StudentController.deleteStudentById);

export const StudentRoutes = router;
