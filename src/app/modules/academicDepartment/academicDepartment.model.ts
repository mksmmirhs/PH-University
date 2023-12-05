import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  }
);

academicDepartmentSchema.pre('save', async function (next) {
  if (await AcademicDepartment.findOne({ name: this.name })) {
    throw new Error('Academic Department already exist');
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  if (!(await AcademicDepartment.findOne(this.getQuery()))) {
    throw new Error('Academic Department do not exist');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema
);
