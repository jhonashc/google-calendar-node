import { TypeOf, z } from 'zod';

export const createEventSchema = z.object({
  body: z.object({
    calendarId: z
      .string({
        required_error: 'The field calendarId is required',
        invalid_type_error: 'The field calendarId must be a string',
      })
      .min(1, {
        message: 'The field calendarId cannot be empty',
      }),
    summary: z
      .string({
        required_error: 'The field summary is required',
        invalid_type_error: 'The field summary must be a string',
      })
      .min(1, {
        message: 'The field summary cannot be empty',
      }),
    description: z
      .string({
        invalid_type_error: 'The field description must be a string',
      })
      .optional(),
    startDateTime: z
      .string({
        required_error: 'The field start date and time is required',
        invalid_type_error: 'The field start date and time must be a string',
      })
      .min(1, {
        message: 'The field start date and time cannot be empty',
      }),
    endDateTime: z
      .string({
        required_error: 'The field end date and time is required',
        invalid_type_error: 'The field end date and time must be a string',
      })
      .min(1, {
        message: 'The field end date and time cannot be empty',
      }),
    attendees: z
      .array(
        z.object({
          email: z
            .string({
              required_error: 'The field email is required for each attendee',
              invalid_type_error: 'The field email must be a string',
            })
            .email('Each attendee must have a valid email address'),
        }),
      )
      .nonempty({
        message: 'The field attendees is required',
      }),
  }),
});

export type CreateEventInput = TypeOf<typeof createEventSchema>['body'];
