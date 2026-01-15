import { pgTable, integer, text, timestamp, date, unique } from 'drizzle-orm/pg-core';

export const visits = pgTable(
  'visits',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    ipAddress: text('ip_address').notNull(),
    userAgent: text('user_agent'),
    path: text('path').notNull(),
    on: date('on').notNull(),
  },
  (table) => [unique().on(table.ipAddress, table.on)]
);

export const guestbook = pgTable('guestbook', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  message: text('message').notNull(),
  ipAddress: text('ip_address').notNull(),
  signedAt: timestamp('signed_at').notNull(),
});

export type Visit = typeof visits.$inferSelect;
export type NewVisit = typeof visits.$inferInsert;
export type GuestbookEntry = typeof guestbook.$inferSelect;
export type NewGuestbookEntry = typeof guestbook.$inferInsert;
