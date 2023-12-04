import { Types } from 'mongoose';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { Student } from '../student/student.model';

const findLastStudentId = async (semesterID: Types.ObjectId) => {
  const lastStudent = await Student.findOne(
    { admissionSemester: semesterID },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (
  payload: TAcademicSemester,
  semesterID: Types.ObjectId
) => {
  const currentId = (await findLastStudentId(semesterID)) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
