import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';

import { envs } from './config';

class Server {
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(envs.PORT);
    this.initialize();
  }

  private initialize(): void {
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {}

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 App running on port ${this.port}`);
    });
  }
}

export default Server;
