import { boolean, pgSchema, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const schema = pgSchema(process.env.DB_SCHEMA as string);

export const users = schema.table('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  avatarUrl: varchar('avatar_url', { length: 255 }).notNull(),
  admin: boolean('admin').notNull().default(false),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
