/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Response, Request, NextFunction } from 'express';
import httpStatus from 'http-status';

const notFound = (
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const code = httpStatus.NOT_FOUND;
  return res.status(code).json({
    success: false,
    message: 'Api link not found',
    error: '',
  });
};

export default notFound;
