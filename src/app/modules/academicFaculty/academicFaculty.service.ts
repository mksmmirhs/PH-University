import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const findAllAcademicFaculty = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const findSingleAcademicFacultyById = async (facultyId: string) => {
  const result = await AcademicFaculty.findOne({ _id: facultyId });
  return result;
};

const updateAcademicFacultyIntoDB = async (
  facultyId: string,
  payload: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: facultyId },
    payload,
    { new: true }
  );
  return result;
};
export const AcademicFacultyService = {
  createAcademicFacultyIntoDB,
  findAllAcademicFaculty,
  findSingleAcademicFacultyById,
  updateAcademicFacultyIntoDB,
};
