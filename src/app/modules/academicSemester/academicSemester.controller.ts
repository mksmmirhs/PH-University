import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await AcademicSemesterService.createAcademicSemesterIntoDB(
      data
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester created successful',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
};