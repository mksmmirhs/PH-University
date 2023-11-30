/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Response, Request, NextFunction } from 'express';
import httpStatus from 'http-status';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const code = httpStatus.NOT_ACCEPTABLE;
  const message = err.message || 'oops something went wrong';
  return res.status(code).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
