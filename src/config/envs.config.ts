import { envsSchema } from '../schemas';

const envServer = envsSchema.safeParse({
  PORT: process.env.PORT,
});

if (!envServer.success) {
  console.error(envServer.error.issues);
  process.exit(1);
}

export const envs = envServer.data;
