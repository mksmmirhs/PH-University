/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { RegistrationStatus } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';
import mongoose from 'mongoose';
import { OfferedCourse } from '../OfferedCourse/OfferedCourse.model';

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */
  const academicSemester = payload?.academicSemester;
  // checks semester registration status
  const isTheSemesterUpcomingOrOngoing = await SemesterRegistration.findOne({
    $or: [{ status: RegistrationStatus.UPCOMING }, { status: RegistrationStatus.ONGOING }],
  });
  if (isTheSemesterUpcomingOrOngoing) {
    throw new AppError(
      httpStatus.CONFLICT,
      `There is already a ${isTheSemesterUpcomingOrOngoing.status} Semester`,
    );
  }
  // is the semester exist ?
  const isTheSemesterExist = await AcademicSemester.findById(academicSemester);
  if (!isTheSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'The semester do not exist');
  }
  // is the semester is already registered
  const isTheSemesterAlreadyRegistered = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isTheSemesterAlreadyRegistered) {
    throw new AppError(httpStatus.CONFLICT, 'The semester already registered');
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (query: Record<string, unknown>) => {
  const semesterRegistrationQueryBuilder = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .sort()
    .paginate()
    .filter()
    .fields();
  const result = await semesterRegistrationQueryBuilder.modelQuery;
  return result;
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
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

  // const academicSemester = payload?.academicSemester;
  // const isTheSemesterExist = await AcademicSemester.findById(academicSemester);
  // if (!isTheSemesterExist) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
  // }
  // check if the semester is already registered!
  const isSemesterAlreadyRegistered = await SemesterRegistration.findById(id);
  if (!isSemesterAlreadyRegistered) {
    throw new AppError(httpStatus.CONFLICT, 'The semester is not registered');
  }
  //If the requested semester registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterAlreadyRegistered.status;
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'The semester is ended you can not update');
  }
  // check if the semester registration changes from upcoming to end

  const requestedSemesterStatus = payload.status;
  if (
    requestedSemesterStatus === RegistrationStatus.ENDED &&
    currentSemesterStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not change semester status from ${currentSemesterStatus} to ${requestedSemesterStatus} `,
    );
  }
  // can not change from ongoing to upcoming
  if (
    requestedSemesterStatus === RegistrationStatus.UPCOMING &&
    currentSemesterStatus === RegistrationStatus.ONGOING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not change semester status from ${currentSemesterStatus} to ${requestedSemesterStatus} `,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registration when the status is 
  'UPCOMING'.
  **/
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.BAD_REQUEST, `The semester registration do not exist`);
  }
  // can not delete the ongoing or ended semester registration
  if (isSemesterRegistrationExist?.status !== RegistrationStatus.UPCOMING) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not delete the ${isSemesterRegistrationExist?.status} semester registration`,
    );
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteSemesterRegistration = await SemesterRegistration.findByIdAndDelete(id, {
      session,
    });
    if (!deleteSemesterRegistration) {
      throw new AppError(httpStatus.BAD_REQUEST, `Semester registration delete failed`);
    }

    const deleteAllOfferedCourse = await OfferedCourse.deleteMany(
      {
        semesterRegistration: id,
      },
      { session },
    );
    if (!deleteAllOfferedCourse) {
      throw new AppError(httpStatus.BAD_REQUEST, `Offered course delete failed`);
    }
    await session.commitTransaction();
    await session.endSession();
    return null;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
