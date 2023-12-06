import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const statusCode = 400;

  const regex = /(\w+):\s*"([^"]+)"/;
  const match = error.message.match(regex);
  const key = match[1];
  const extractedString = match[2];
  const errorSource: TErrorSources = [
    {
      path: key,
      message: `${extractedString} is already exist`,
    },
  ];

  return { statusCode, message: 'Duplicate entry', errorSource };
};

export default handleDuplicateError;
