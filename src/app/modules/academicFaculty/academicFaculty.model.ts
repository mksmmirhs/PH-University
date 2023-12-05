import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

academicFacultySchema.pre('save', async function (next) {
  if (await AcademicFaculty.findOne({ name: this.name })) {
    throw new Error('Academic Faculty already exist');
  }
  next();
});

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  if (!(await AcademicFaculty.findOne(this.getQuery()))) {
    throw new Error('Academic Faculty do not exist');
  }
  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema
);
