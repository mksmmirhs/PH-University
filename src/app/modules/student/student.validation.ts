import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1, { message: 'First name must not be empty' }),
  middleName: z
    .string({ invalid_type_error: 'Middle name must not be empty' })
    .optional(),
  lastName: z.string().min(1, { message: 'Last name must not be empty' }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father name must not be empty' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father occupation must not be empty' }),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father contact number must not be empty' }),
  motherName: z.string().min(1, { message: 'Mother name must not be empty' }),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother occupation must not be empty' }),
  motherContactNo: z
    .string()
    .min(1, { message: 'Mother contact number must not be empty' }),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Local guardian name must not be empty' }),
  occupation: z
    .string()
    .min(1, { message: 'Local guardian occupation must not be empty' }),
  contactNo: z
    .string()
    .min(1, { message: 'Local guardian contact number must not be empty' }),
  address: z
    .string()
    .min(1, { message: 'Local guardian address must not be empty' }),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }),
      contactNo: z
        .string()
        .min(1, { message: 'Contact number must not be empty' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number must not be empty' }),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address must not be empty' }),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent address must not be empty' }),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name must not be empty' })
    .optional(),
  middleName: z
    .string()
    .min(1, { message: 'Middle name must not be empty' })
    .optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name must not be empty' })
    .optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(1, { message: 'Father name must not be empty' })
    .optional(),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father occupation must not be empty' })
    .optional(),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father contact number must not be empty' })
    .optional(),
  motherName: z
    .string()
    .min(1, { message: 'Mother name must not be empty' })
    .optional(),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother occupation must not be empty' })
    .optional(),
  motherContactNo: z
    .string()
    .min(1, { message: 'Mother contact number must not be empty' })
    .optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Local guardian name must not be empty' })
    .optional(),
  occupation: z
    .string()
    .min(1, { message: 'Local guardian occupation must not be empty' })
    .optional(),
  contactNo: z
    .string()
    .min(1, { message: 'Local guardian contact number must not be empty' })
    .optional(),
  address: z
    .string()
    .min(1, { message: 'Local guardian address must not be empty' })
    .optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: updateUserNameValidationSchema,
        gender: z.enum(['male', 'female']).optional(),
        dateOfBirth: z.string().optional(),
        email: z
          .string()
          .email({ message: 'Invalid email address' })
          .optional(),
        contactNo: z
          .string()
          .min(1, { message: 'Contact number must not be empty' })
          .optional(),
        emergencyContactNo: z
          .string()
          .min(1, { message: 'Emergency contact number must not be empty' })
          .optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        presentAddress: z
          .string()
          .min(1, { message: 'Present address must not be empty' })
          .optional(),
        permanentAddress: z
          .string()
          .min(1, { message: 'Permanent address must not be empty' })
          .optional(),
        guardian: updateGuardianValidationSchema.optional(),
        localGuardian: updateLocalGuardianValidationSchema.optional(),
        profileImg: z.string().optional(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
      })
      .optional(),
  }),
});

export const studentValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
