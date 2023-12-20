import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleCastError = (error: mongoose.Error.CastError): TGenericErrorResponse => {
  const statusCode = 400;
  const errorSource: TErrorSources = [
    {
      message: error?.message,
      path: error?.path,
    },
  ];

  return {
    statusCode,
    message: 'Invalid ID',
    errorSource,
  };
};

export default handleCastError;
