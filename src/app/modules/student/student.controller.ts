import { StudentService } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudents(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All student retrieve success',
    data: result,
  });
});

const findStudentById = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.findStudentById(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieve success',
    data: result,
  });
});

const deleteStudentById = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.deleteStudentById(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successful',
    data: result,
  });
});

const updateStudentIntoDb = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const payload = req.body.student;
  const result = await StudentService.updateStudentIntoDb(studentId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student update successful',
    data: result,
  });
});

export const StudentController = {
  getAllStudent,
  findStudentById,
  deleteStudentById,
  updateStudentIntoDb,
};
