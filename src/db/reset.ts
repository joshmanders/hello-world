import 'dotenv/config';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

async function reset() {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS guestbook CASCADE');
    await client.query('DROP TABLE IF EXISTS visits CASCADE');
    console.log('Tables dropped successfully');
  } finally {
    client.release();
    await pool.end();
  }
}

reset().catch(console.error);
