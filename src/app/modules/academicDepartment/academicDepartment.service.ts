import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const findAllAcademicDepartment = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const findSingleAcademicDepartmentById = async (departmentId: string) => {
  const result = await AcademicDepartment.findOne({
    _id: departmentId,
  }).populate('academicFaculty');
  return result;
};

const updateAcademicFacultyIntoDB = async (
  departmentId: string,
  payload: Partial<TAcademicDepartment>
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: departmentId },
    payload,
    { new: true }
  );
  return result;
};
export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  findAllAcademicDepartment,
  findSingleAcademicDepartmentById,
  updateAcademicFacultyIntoDB,
};
