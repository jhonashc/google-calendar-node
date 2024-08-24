import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { CustomError } from '../errors';

export const exceptionHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    const { message, statusCode } = error;

    return res.status(statusCode).json({
      status: false,
      message,
    });
  }

  if (error instanceof ZodError) {
    const errors = error.issues.map((issue) => issue.message);

    return res.status(400).json({
      status: false,
      message: errors,
    });
  }

  return res.status(500).json({
    status: false,
    message: 'Something went wrong, try again later',
  });
};
