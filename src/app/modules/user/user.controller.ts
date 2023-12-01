import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  const result = await UserService.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successful',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
