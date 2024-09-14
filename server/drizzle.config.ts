import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/drizzle/models/index.ts',
  out: './src/drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL as string,
  },
  verbose: true,
  strict: true,
  migrations: {
    schema: 'drizzle',
    table: 'drizzle_migrations',
  },
});
