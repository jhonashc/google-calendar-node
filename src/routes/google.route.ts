import { Router } from 'express';

import { GoogleController } from '../controllers';
import { GoogleService } from '../services';

export class GoogleRoutes {
  static get routes(): Router {
    const router = Router();

    const googleService = GoogleService.getInstance();
    const googleController = new GoogleController(googleService);

    router.get('/auth', googleController.authenticate);
    router.get('/redirect', googleController.redirect);

    return router;
  }
}
