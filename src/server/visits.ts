import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { count } from 'drizzle-orm';
import { z } from 'zod';
import { db, schema } from '@app/db';

const TrackVisitSchema = z.object({
  path: z.string(),
});

export const trackVisit = createServerFn({ method: 'POST' })
  .inputValidator(TrackVisitSchema)
  .handler(async ({ data }) => {
    const forwarded = getRequestHeader('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';
    const userAgent = getRequestHeader('user-agent') || null;
    const today = new Date().toISOString().split('T')[0];

    try {
      await db
        .insert(schema.visits)
        .values({
          ipAddress: ip,
          userAgent: userAgent,
          path: data.path,
          on: today,
        })
        .onConflictDoNothing();
    } catch (err) {
      console.error('Error tracking visit:', err);
    }
  });

export const getVisitorCount = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const result = await db.select({ count: count() }).from(schema.visits);
    return result[0]?.count || 0;
  } catch (err) {
    console.error('Error getting counter:', err);
    return 0;
  }
});
