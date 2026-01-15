import { faker } from '@faker-js/faker';
import 'dotenv/config';
import { db, schema } from './index';

async function seed() {
  console.log('Seeding guestbook entries...');

  const entries = Array.from({ length: 25 }, () => ({
    name: faker.person.fullName(),
    message: faker.lorem.sentences({ min: 1, max: 3 }),
    ipAddress: faker.internet.ip(),
    signedAt: faker.date.recent({ days: 30 }),
  }));

  await db.insert(schema.guestbook).values(entries);

  console.log('Seeded 25 guestbook entries');
  process.exit(0);
}

seed().catch(console.error);
