import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Student } from './student.model';
import mongoose from 'mongoose';
import { User } from '../user/user.model';

const getAllStudents = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const findStudentById = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentById = async (id: string) => {
  if (!(await Student.isUserExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'No student exist with this id');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Could not delete the student'
      );
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Can not delete the user');
    }

    session.commitTransaction();
    session.endSession();
    return deletedStudent;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Student delate failed');
  }
};

export const StudentService = {
  getAllStudents,
  findStudentById,
  deleteStudentById,
};
