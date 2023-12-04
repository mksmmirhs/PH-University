import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultySchemaValidation
  ),
  AcademicFacultyController.createAcademicFacultyIntoDB
);

router.get('/', AcademicFacultyController.findAllAcademicFaculty);

router.get(
  '/:facultyId',
  AcademicFacultyController.findSingleAcademicFacultyById
);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultySchemaValidation
  ),
  AcademicFacultyController.updateAcademicFacultyIntoDB
);

export const AcademicFacultyRoutes = router;
