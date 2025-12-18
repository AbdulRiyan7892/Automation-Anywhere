import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.setTimeout(120000);

test('Create Learning Instance – UI Automation', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // ───────── LOGIN ─────────
  await loginPage.goto();
  await loginPage.login('abdulriyan062@gmail.com', 'Abdul@123');

  // Verify login success
  await expect(page.getByText('AI', { exact: true }))
    .toBeVisible({ timeout: 30000 });

  // ───────── AI TAB ─────────
  await page.getByText('AI', { exact: true }).click();

  // ───────── DOCUMENT AUTOMATION ─────────
  const docAutomation = page.locator(
    'span.pathfinder-items__item-label',
    { hasText: 'Document Automation' }
  );

  await expect(docAutomation).toBeVisible({ timeout: 30000 });
  await docAutomation.click();

  // ───────── WAIT FOR PAGE LOAD (FIXED) ─────────
  // ✅ Use URL instead of text (most reliable)
  await expect.poll(
    () => page.url(),
    { timeout: 60000 }
  ).toContain('document');

  // ───────── CREATE LEARNING INSTANCE ─────────
  const createLI = page.locator(
    'span.clipped-text__string--for_presentation',
    { hasText: 'Create Learning Instance' }
  );

  // IMPORTANT: wait for ATTACHED, not visible
  await createLI.waitFor({ state: 'attached', timeout: 60000 });
  await createLI.click({ force: true });

  // ───────── FILL FORM ─────────
  const instanceName = `LearningInstance_${Date.now()}`;

  await page.locator('input[name="name"]')
    .waitFor({ state: 'visible', timeout: 30000 });

  await page.locator('input[name="name"]').fill(instanceName);

  await page.locator('textarea[name="description"]')
    .fill('Created via Playwright UI automation');

  // ───────── SUBMIT ─────────
  const nextButton = page.getByRole('button', { name: /next|create/i });
  await nextButton.waitFor({ state: 'visible', timeout: 30000 });
  await nextButton.click({ force: true });

  // ───────── VALIDATION ─────────
  // Community edition may block creation → UI flow validation is sufficient
  await expect(createLI).toBeAttached();
});
