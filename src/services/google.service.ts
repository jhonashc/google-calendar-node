import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

import { envs } from '../config';

export class GoogleService {
  private static instance: GoogleService;
  private readonly oAuth2Client: OAuth2Client;
  private readonly scopes = ['https://www.googleapis.com/auth/calendar'];

  private constructor() {
    this.oAuth2Client = new google.auth.OAuth2(envs.CLIENT_ID, envs.CLIENT_SECRET, envs.REDIRECT_URL);
  }

  static getInstance(): GoogleService {
    if (!GoogleService.instance) {
      GoogleService.instance = new GoogleService();
    }
    
    return GoogleService.instance;
  }

  async authenticate() {
    return this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.scopes,
    });
  }

  async redirect(code: string) {
    const { tokens } = await this.oAuth2Client.getToken(code);
    this.oAuth2Client.setCredentials(tokens);
  }

  getOAuth2Client(): OAuth2Client {
    return this.oAuth2Client;
  }
}
