import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { count, desc, gt, and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db, schema } from '@app/db';

const ENTRIES_PER_PAGE = 10;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

const GetEntriesSchema = z.object({
  page: z.number(),
});

const SubmitEntrySchema = z.object({
  name: z.string(),
  message: z.string(),
  fax: z.string(),
});

export const getEntries = createServerFn({ method: 'GET' })
  .inputValidator(GetEntriesSchema)
  .handler(async ({ data }) => {
    const page = Math.max(1, data.page);
    const offset = (page - 1) * ENTRIES_PER_PAGE;

    const [entries, totalResult] = await Promise.all([
      db
        .select({
          id: schema.guestbook.id,
          name: schema.guestbook.name,
          message: schema.guestbook.message,
          signedAt: schema.guestbook.signedAt,
        })
        .from(schema.guestbook)
        .orderBy(desc(schema.guestbook.signedAt))
        .limit(ENTRIES_PER_PAGE)
        .offset(offset),
      db.select({ count: count() }).from(schema.guestbook),
    ]);

    const total = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(total / ENTRIES_PER_PAGE);

    return {
      entries,
      page,
      totalPages,
    };
  });

export const submitEntry = createServerFn({ method: 'POST' })
  .inputValidator(SubmitEntrySchema)
  .handler(async ({ data }) => {
    // Get IP from request headers
    const forwarded = getRequestHeader('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';

    // Honeypot check - if filled, it's a bot
    if (data.fax) {
      return { success: false, error: 'bot' };
    }

    // Validation
    if (!data.name || !data.message) {
      return { success: false, error: 'validation' };
    }

    // Rate limiting - check recent entries by IP
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);
    const recentEntries = await db
      .select({ count: count() })
      .from(schema.guestbook)
      .where(and(eq(schema.guestbook.ipAddress, ip), gt(schema.guestbook.signedAt, windowStart)));

    if ((recentEntries[0]?.count || 0) >= RATE_LIMIT_MAX) {
      return { success: false, error: 'rate_limit' };
    }

    try {
      await db.insert(schema.guestbook).values({
        name: data.name.trim().slice(0, 100),
        message: data.message.trim().slice(0, 1000),
        ipAddress: ip,
        signedAt: new Date(),
      });

      return { success: true };
    } catch (err) {
      console.error('Error saving guestbook entry:', err);
      return { success: false, error: 'server' };
    }
  });
