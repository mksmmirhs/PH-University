import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: [true, 'Academic department name is required'],
      unique: true,
    },
    academicFaculty: {
      type: Schema.ObjectId,
      required: [true, 'Academic Faculty is required'],
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  if (await AcademicDepartment.findOne({ name: this.name })) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Academic Department already exist');
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  if (!(await AcademicDepartment.findOne(this.getQuery()))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department do not exist');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
