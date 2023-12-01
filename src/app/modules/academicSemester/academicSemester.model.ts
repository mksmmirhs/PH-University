import { Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';

const monthSchema;

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: ['Autumn', 'Summar', 'Fall'],
  },
  code: {
    type: String,
    enum: ['01', '02', '03'],
  },
  year: {
    type: String,
  },
});
