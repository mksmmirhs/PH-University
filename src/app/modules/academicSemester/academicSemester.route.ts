import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicSemister.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.createAcademicSemester
);

// get all semesters
router.get('/', AcademicSemesterController.getAllAcademicSemester);

// get single semester by id
router.get('/:id', AcademicSemesterController.getASemesterById);

// upade a semester
router.get('/:id', AcademicSemesterController.getASemesterById);

export const AcademicSemesterRoutes = router;
