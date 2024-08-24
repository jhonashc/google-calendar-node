import { Router } from 'express';

import { CalendarRoutes } from './calendar.route';
import { GoogleRoutes } from './google.route';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/v1/calendar', CalendarRoutes.routes);
    router.use('/api/v1/google', GoogleRoutes.routes);

    return router;
  }
}
