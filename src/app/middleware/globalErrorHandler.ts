/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interface/error';
import config from '../config';
import { ZodError, ZodIssue } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'oops something went wrong';
  let errorSource: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
    statusCode = simplifiedError?.statusCode;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
    statusCode = simplifiedError?.statusCode;
  } else if (err.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
    statusCode = simplifiedError?.statusCode;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
    statusCode = simplifiedError?.statusCode;
  } else if (err instanceof AppError) {
    message = err?.message;
    errorSource = [
      {
        path: '',
        message: err?.message,
      },
    ];
    statusCode = err?.statusCode;
  } else if (err instanceof Error) {
    message = err?.message;
    errorSource = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    err,
    stack: config.APP_ENV === 'Development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
