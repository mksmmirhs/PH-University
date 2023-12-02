import { AcademicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { ObjectId } from 'express';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemester = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getASemesterByIdasync = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id: id });
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemester,
  getASemesterByIdasync,
};
