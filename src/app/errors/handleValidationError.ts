import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  error: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const statusCode = 400;

  const errorSource: TErrorSources = Object.values(error.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    }
  );

  // this works also
  //   const errorSource: TErrorSources = [];
  //   for (const [key, value] of Object.entries(error.errors)) {
  //     errorSource.push({
  //       path: error?.errors[key]?.path,
  //       message: value?.message,
  //     });
  //   }
  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  };
};

export default handleValidationError;
