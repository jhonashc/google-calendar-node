import { NextFunction, Request, Response } from 'express';

import { CalendarService } from '../services';

export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  createEvent = (req: Request, res: Response, next: NextFunction) => {
    this.calendarService
      .createEvent(req.body)
      .then((createdEvent) => res.status(201).json(createdEvent))
      .catch((error) => next(error));
  };

  getEvents = (req: Request, res: Response, next: NextFunction) => {
    this.calendarService
      .getEvents()
      .then((events) => res.json(events))
      .catch((error) => next(error));
  };
}
