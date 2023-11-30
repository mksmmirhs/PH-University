import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();

router.post('/create-student', StudentController.createStudent);
router.get('/', StudentController.getAllStudent);
router.get('/:studentId', StudentController.findStudentById);
router.delete('/:studentId', StudentController.deleteStudentById);

export const StudentRoutes = router;
