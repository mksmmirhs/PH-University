/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { RegistrationStatus } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */
  const academicSemester = payload?.academicSemester;
  // checks semester registration status
  const isTheSemesterUpcomingOrOngoing = await SemesterRegistration.findOne({
    $or: [
      { status: RegistrationStatus.UPCOMING },
      { status: RegistrationStatus.ONGOING },
    ],
  });
  if (isTheSemesterUpcomingOrOngoing) {
    throw new AppError(
      httpStatus.CONFLICT,
      `There is already a ${isTheSemesterUpcomingOrOngoing.status} Semester`
    );
  }
  // is the semester exist ?
  const isTheSemesterExist = await AcademicSemester.findById(academicSemester);
  if (!isTheSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'The semester do not exist');
  }
  // is the semester is already registered
  const isTheSemesterAlreadyRegistered = await SemesterRegistration.findById(
    academicSemester
  );
  if (isTheSemesterAlreadyRegistered) {
    throw new AppError(httpStatus.CONFLICT, 'The semester already registered');
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQueryBuilder = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query
  )
    .sort()
    .paginate()
    .filter()
    .fields();
  const result = await semesterRegistrationQueryBuilder.modelQuery;
  return result;
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id).populate(
    'academicSemester'
  );
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  /**
   * Step1: Check if the semester is exist
   * Step2: Check if the requested registered semester is exists
   * Step3: If the requested semester registration is ended, we will not update anything
   * Step4: If the requested semester registration is 'UPCOMING', we will let update everything.
   * Step5: If the requested semester registration is 'ONGOING', we will not update anything  except status to 'ENDED'
   * Step6: If the requested semester registration is 'ENDED' , we will not update anything
   *
   * UPCOMING --> ONGOING --> ENDED
   *
   */
  // check if the requested registered semester is exists
  // check if the semester is already registered!
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registration when the status is 
  'UPCOMING'.
  **/
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
