import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('homepage matches screenshot', async ({ page }) => {
    await page.goto('/');

    // Wait for any animations to settle
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('guestbook page matches screenshot', async ({ page }) => {
    await page.goto('/cgi-bin/guestbook/pl?page=1');

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('guestbook.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});
