import { NextFunction, Request, Response } from 'express';

import { GoogleService } from '../services';

export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  authenticate = (req: Request, res: Response, next: NextFunction) => {
    this.googleService
      .authenticate()
      .then((redirectUrl) => res.redirect(redirectUrl))
      .catch((error) => next(error));
  };

  redirect = (req: Request, res: Response, next: NextFunction) => {
    this.googleService
      .redirect(`${req.query.code}`)
      .then(() => res.send('Authentication successful!'))
      .catch((error) => next(error));
  };
}
