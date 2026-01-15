import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../src/db';

// ============================================
// Database Reset
// ============================================

export async function resetDatabase() {
  await db.delete(schema.guestbook);
  await db.delete(schema.visits);
}

// ============================================
// Guestbook
// ============================================

export type GuestbookEntryData = typeof schema.guestbook.$inferInsert;

export async function createGuestbookEntry(data: GuestbookEntryData) {
  const [created] = await db.insert(schema.guestbook).values(data).returning();
  return created;
}

export async function deleteGuestbookEntry(id: number) {
  await db.delete(schema.guestbook).where(eq(schema.guestbook.id, id));
}

// ============================================
// Visits
// ============================================

export type VisitData = typeof schema.visits.$inferInsert;

export async function createVisit(data: VisitData) {
  const [created] = await db.insert(schema.visits).values(data).returning();
  return created;
}

export async function deleteVisit(id: number) {
  await db.delete(schema.visits).where(eq(schema.visits.id, id));
}
