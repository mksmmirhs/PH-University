/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { TErrorSource } from '../interface/error';
import config from '../config';
import { ZodError, ZodIssue } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'oops something went wrong';
  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  const handleZodError = (error: ZodError) => {
    const statusCode = 400;

    const errorSource: TErrorSource = error.issues.map((issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    return {
      statusCode,
      message: 'Validation Error',
      errorSource,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
    statusCode = simplifiedError.statusCode;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.APP_ENV === 'Development' ? err.stack : null,
  });
};

export default globalErrorHandler;
