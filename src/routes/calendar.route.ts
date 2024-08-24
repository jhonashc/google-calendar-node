import { Router } from 'express';

import { CalendarController } from '../controllers';
import { validateRequest } from '../middlewares';
import { createEventSchema } from '../schemas';
import { CalendarService, GoogleService } from '../services';

export class CalendarRoutes {
  static get routes(): Router {
    const router = Router();

    const googleService = GoogleService.getInstance();
    const calendarService = new CalendarService(googleService.getOAuth2Client());

    const calendarController = new CalendarController(calendarService);

    router.post('/create-event', validateRequest(createEventSchema), calendarController.createEvent);
    router.get('/events', calendarController.getEvents);

    return router;
  }
}
