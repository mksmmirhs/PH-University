import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentService } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudent: RequestHandler = async (req, res, next) => {
  try {
    const result = await StudentService.getAllStudents();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All student retrieve success',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const findStudentById: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.findStudentById(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student retrieve success',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteStudentById: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteStudentById(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student deleted successful',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentController = {
  getAllStudent,
  findStudentById,
  deleteStudentById,
};
