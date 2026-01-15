import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { resetDatabase, createGuestbookEntry } from './helpers/db';

test.describe('Guestbook Functionality', () => {
  test.beforeEach(async () => {
    // Seed faker for deterministic test data
    faker.seed(54321);
    await resetDatabase();
  });

  test('can sign the guestbook and entry appears', async ({ page }) => {
    await page.goto('/cgi-bin/guestbook.pl?page=1');
    await page.waitForLoadState('networkidle');

    const testName = 'E2E Test User';
    const testMessage = 'This is an automated test message from Playwright!';

    await page.fill('input[name="name"]', testName);
    await page.fill('textarea[name="message"]', testMessage);

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page).toHaveScreenshot('guestbook-form-filled.png', {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixelRatio: 0.02,
    });

    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText(testName)).toBeVisible();
    await expect(page.getByText(testMessage)).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page).toHaveScreenshot('guestbook-after-signing.png', {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixelRatio: 0.02,
    });
  });

  test('shows validation error for empty fields', async ({ page }) => {
    await page.goto('/cgi-bin/guestbook.pl?page=1');
    await page.waitForLoadState('networkidle');

    await page.fill('input[name="name"]', 'Test User');
    await page.click('button[type="submit"]');

    const messageInput = page.locator('textarea[name="message"]');
    await expect(messageInput).toHaveAttribute('required', '');

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page).toHaveScreenshot('guestbook-validation.png', {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixelRatio: 0.02,
    });
  });

  test('displays existing guestbook entries', async ({ page }) => {
    // Set up world: create entries to display
    for (let i = 0; i < 3; i++) {
      await createGuestbookEntry({
        name: faker.person.fullName(),
        message: faker.lorem.sentences({ min: 1, max: 3 }),
        ipAddress: faker.internet.ip(),
        signedAt: faker.date.recent({ days: 30 }),
      });
    }

    await page.goto('/cgi-bin/guestbook.pl?page=1');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('~*~ Guestbook Entries ~*~')).toBeVisible();

    const entries = page.locator('[class*="guestbook-entry"], .bg-retro-navy.border-retro-gray');
    const entryCount = await entries.count();
    expect(entryCount).toBeGreaterThan(0);
  });
});
