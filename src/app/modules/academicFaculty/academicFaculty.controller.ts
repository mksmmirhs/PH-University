import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFacultyIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
      payload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculty created successfully',
      data: result,
    });
  }
);

const findAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.findAllAcademicFaculty();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All Faculty fetched successful',
      data: result,
    });
  }
);

const findSingleAcademicFacultyById = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyService.findSingleAcademicFacultyById(
      facultyId
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculty fetched successful',
      data: result,
    });
  }
);

const updateAcademicFacultyIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const payload = req.body;
    const result = await AcademicFacultyService.updateAcademicFacultyIntoDB(
      facultyId,
      payload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculty update successful',
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createAcademicFacultyIntoDB,
  findAllAcademicFaculty,
  findSingleAcademicFacultyById,
  updateAcademicFacultyIntoDB,
};
