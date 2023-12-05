import z from 'zod';

const createAcademicFacultySchemaValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Faculty name must be string',
    }),
  }),
});
const updateAcademicFacultySchemaValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Faculty name must be string',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultySchemaValidation,
  updateAcademicFacultySchemaValidation,
};
