import mongoose from 'mongoose';

export type TSemesterRegistration = {
  academicSemester: mongoose.Types.ObjectId;
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};
