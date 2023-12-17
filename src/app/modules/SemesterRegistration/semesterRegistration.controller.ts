import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'Semester Registration is created successfully!',
    //   data: result,
    // });
  }
);

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'Semester Registration is retrieved successfully !',
    //   data: result,
    // });
  }
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'Semester Registration is retrieved successfully',
    //   data: result,
    // });
  }
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'Semester Registration is updated successfully',
    //   data: result,
    // });
  }
);

const deleteSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'Semester Registration is updated successfully',
    //   data: result,
    // });
  }
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
