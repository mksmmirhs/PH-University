import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentController.createAcademicDepartmentIntoDB
);

router.get('/', AcademicDepartmentController.findAllAcademicDepartment);

router.get(
  '/:departmentId',
  AcademicDepartmentController.findSingleAcademicDepartmentById
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentController.updateAcademicDepartmentIntoDB
);

export const AcademicDepartmentRoutes = router;
