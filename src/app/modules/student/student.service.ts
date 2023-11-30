import { Student } from './student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student); // build in static method
  // const student = new Student(studentData); // instance method

  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exist');
  }

  const result = await Student.create(studentData);
  return result;
};

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
  createStudentIntoDB,
  getAllStudents,
  findStudentById,
  deleteStudentById,
};
