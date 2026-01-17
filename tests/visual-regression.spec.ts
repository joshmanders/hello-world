import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { resetDatabase, createGuestbookEntry } from './helpers/db';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async () => {
    // Seed faker for deterministic test data
    faker.seed(12345);
    await resetDatabase();
  });

  test('homepage matches screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixelRatio: 0.05,
    });
  });

  test('guestbook page with entries matches screenshot', async ({ page }) => {
    // Set up world: create some guestbook entries
    for (let i = 0; i < 5; i++) {
      await createGuestbookEntry({
        name: faker.person.fullName(),
        message: faker.lorem.sentences({ min: 1, max: 3 }),
        ipAddress: faker.internet.ip(),
        signedAt: faker.date.recent({ days: 30 }),
      });
    }

    await page.goto('/cgi-bin/guestbook.pl?page=1');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('guestbook.png', {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixelRatio: 0.05,
    });
  });

  test('guestbook with single entry has footer at bottom', async ({ page }) => {
    // Set up world: just one entry
    await createGuestbookEntry({
      name: faker.person.fullName(),
      message: faker.lorem.sentence(),
      ipAddress: faker.internet.ip(),
      signedAt: new Date(),
    });

    // Use a tall viewport to verify footer pins to bottom when content is short
    // Must be tall enough to show header + content + footer with space to spare
    await page.setViewportSize({ width: 1280, height: 1400 });

    await page.goto('/cgi-bin/guestbook.pl?page=1');
    await page.waitForLoadState('networkidle');

    // Viewport screenshot to verify sticky footer - should see footer at bottom with background filling gap
    await expect(page).toHaveScreenshot('guestbook-single-entry.png', {
      fullPage: false,
      animations: 'disabled',
      maxDiffPixelRatio: 0.05,
    });
  });

  test('empty guestbook has footer at bottom', async ({ page }) => {
    // Set up world: no entries (database already reset)

    // Use a tall viewport to verify footer pins to bottom when content is short
    await page.setViewportSize({ width: 1280, height: 1400 });

    await page.goto('/cgi-bin/guestbook.pl?page=1');
    await page.waitForLoadState('networkidle');

    // Should see footer pinned at bottom with background filling the gap
    await expect(page).toHaveScreenshot('guestbook-empty.png', {
      fullPage: false,
      animations: 'disabled',
      maxDiffPixelRatio: 0.05,
    });
  });
});
