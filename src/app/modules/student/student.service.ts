import { Student } from './student.model';

const getAllStudents = async () => {
  const result = await Student.find();
  return result;
};

const findStudentById = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentById = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentService = {
  getAllStudents,
  findStudentById,
  deleteStudentById,
};
