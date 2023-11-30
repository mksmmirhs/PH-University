import { NextFunction, Request, Response } from 'express';
import { StudentService } from './student.service';

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentService.getAllStudents();
    res.status(200).json({
      success: true,
      message: 'All student retrieve success',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const findStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.findStudentById(studentId);
    res.status(200).json({
      success: true,
      message: 'Student retrieve success',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteStudentById(studentId);
    res.status(200).json({
      success: true,
      message: 'Student deleted success',
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
