import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartmentIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const result =
      await AcademicDepartmentService.createAcademicDepartmentIntoDB(payload);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Department created successfully',
      data: result,
    });
  }
);

const findAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicDepartmentService.findAllAcademicDepartment();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All Department fetched successful',
      data: result,
    });
  }
);

const findSingleAcademicDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const result =
      await AcademicDepartmentService.findSingleAcademicDepartmentById(
        departmentId
      );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Department fetched successful',
      data: result,
    });
  }
);

const updateAcademicDepartmentIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const payload = req.body;
    const result = await AcademicDepartmentService.updateAcademicFacultyIntoDB(
      departmentId,
      payload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Department update successful',
      data: result,
    });
  }
);

export const AcademicDepartmentController = {
  createAcademicDepartmentIntoDB,
  findAllAcademicDepartment,
  findSingleAcademicDepartmentById,
  updateAcademicDepartmentIntoDB,
};
