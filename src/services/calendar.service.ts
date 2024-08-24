import { calendar_v3, google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

import { CreateEventInput } from '../schemas';

export class CalendarService {
  private readonly oAuth2Client: OAuth2Client;
  private readonly calendar: calendar_v3.Calendar;

  constructor(oAuth2Client: OAuth2Client) {
    this.oAuth2Client = oAuth2Client;

    this.calendar = google.calendar({
      version: 'v3',
      auth: this.oAuth2Client,
    });
  }

  async createEvent(createEventInput: CreateEventInput) {
    const { calendarId, summary, description, startDateTime, endDateTime, attendees } = createEventInput;

    const createdEvent = await this.calendar.events.insert({
      calendarId,
      auth: this.oAuth2Client,
      requestBody: {
        summary,
        description,
        start: {
          dateTime: startDateTime,
          timeZone: 'America/Guayaquil',
        },
        end: {
          dateTime: endDateTime,
          timeZone: 'America/Guayaquil',
        },
        attendees,
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // Reminder 1 day before
            { method: 'popup', minutes: 10 }, // Reminder 10 minutes before
          ],
        },
      },
    });

    return {
      status: true,
      message: 'The event has been created successfully',
      data: createdEvent,
    };
  }

  async getEvents() {
    const events = await this.calendar.events.list({
      calendarId: 'primary',
      maxResults: 15,
    });

    return {
      status: true,
      data: events,
    };
  }
}
