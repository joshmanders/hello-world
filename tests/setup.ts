import { execSync } from 'child_process';

export default async function globalSetup() {
  console.log('\n🗄️  Setting up test database...');

  // Reset the database (drop tables)
  console.log('   Dropping existing tables...');
  execSync('npm run db:reset', { stdio: 'inherit' });

  // Seed with baseline test data
  console.log('   Seeding test data...');
  execSync('npm run db:seed', { stdio: 'inherit' });

  console.log('✅ Database setup complete\n');
}
