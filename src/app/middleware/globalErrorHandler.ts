/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Response, Request, NextFunction } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const code = err.statusCode || 500;
  const message = err.message || 'oops something went wrong';
  return res.status(code).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
