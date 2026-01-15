import { test, expect } from '@playwright/test';

test.describe('Guestbook Functionality', () => {
  test('can sign the guestbook and entry appears', async ({ page }) => {
    await page.goto('/cgi-bin/guestbook/pl?page=1');
    await page.waitForLoadState('networkidle');

    // Fill out the guestbook form
    const testName = 'E2E Test User';
    const testMessage = 'This is an automated test message from Playwright!';

    await page.fill('input[name="name"]', testName);
    await page.fill('textarea[name="message"]', testMessage);

    // Scroll to top before screenshot (form interaction causes scroll)
    await page.evaluate(() => window.scrollTo(0, 0));

    // Take screenshot before submission
    await expect(page).toHaveScreenshot('guestbook-form-filled.png', {
      fullPage: true,
      animations: 'disabled',
    });

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for the page to update (form submission and reload)
    await page.waitForLoadState('networkidle');

    // Verify the new entry appears on the page
    await expect(page.getByText(testName)).toBeVisible();
    await expect(page.getByText(testMessage)).toBeVisible();

    // Scroll to top before screenshot
    await page.evaluate(() => window.scrollTo(0, 0));

    // Take screenshot after submission to capture the new entry
    await expect(page).toHaveScreenshot('guestbook-after-signing.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('shows validation error for empty fields', async ({ page }) => {
    await page.goto('/cgi-bin/guestbook/pl?page=1');
    await page.waitForLoadState('networkidle');

    // Try to submit with empty fields (the form has required attributes,
    // so we test by filling one field and leaving the other empty)
    await page.fill('input[name="name"]', 'Test User');
    // Leave message empty

    // Click submit - browser validation should prevent submission
    await page.click('button[type="submit"]');

    // The message field should show HTML5 validation
    const messageInput = page.locator('textarea[name="message"]');
    await expect(messageInput).toHaveAttribute('required', '');

    // Scroll to top before screenshot
    await page.evaluate(() => window.scrollTo(0, 0));

    // Take screenshot showing the validation state
    await expect(page).toHaveScreenshot('guestbook-validation.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('displays existing guestbook entries', async ({ page }) => {
    await page.goto('/cgi-bin/guestbook/pl?page=1');
    await page.waitForLoadState('networkidle');

    // Verify the entries section exists
    await expect(page.getByText('~*~ Guestbook Entries ~*~')).toBeVisible();

    // There should be entries from the seed data
    const entries = page.locator('[class*="guestbook-entry"], .bg-retro-navy.border-retro-gray');
    const entryCount = await entries.count();
    expect(entryCount).toBeGreaterThan(0);
  });
});
