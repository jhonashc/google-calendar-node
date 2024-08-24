import { envsSchema } from '../schemas';

const envServer = envsSchema.safeParse({
  PORT: process.env.PORT,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URL: process.env.REDIRECT_URL,
});

if (!envServer.success) {
  console.error(envServer.error.issues);
  process.exit(1);
}

export const envs = envServer.data;
