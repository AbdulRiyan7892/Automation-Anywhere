import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AutomationPage } from '../pages/AutomationPage';
import { FormPage } from '../pages/FormPage';
import { FormActionsPanelPage } from '../pages/FormActionsPanelPage';
import { FormElementConfigPage } from '../pages/FormElementConfigPage';

test.setTimeout(180000);

test('Create Form with Textbox and File Upload', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const automationPage = new AutomationPage(page);
  const formPage = new FormPage(page);
  const actionsPanel = new FormActionsPanelPage(page);
  const configPanel = new FormElementConfigPage(page);

  // ───────── LOGIN ─────────
  await loginPage.goto();
  await loginPage.login('abdulriyan062@gmail.com', 'Abdul@123');

  // ───── NAVIGATE ─────
  await automationPage.goToAutomation();

  // ───── CREATE FORM ─────
  await formPage.createForm(`Form_${Date.now()}`);

  const formFrame = page.frameLocator('iframe[src*="form"]');

  // ───── ADD TEXT BOX ─────
  await actionsPanel.dragTextBox();
  await configPanel.setLabel('Name');
  await configPanel.setDefaultValue('Test User');

  await expect(
    formFrame.locator('text=Properties - Text Box').first()
  ).toBeVisible({ timeout: 30000 });

  // ───── ADD FILE UPLOAD ─────
  await actionsPanel.dragFileUpload();
  await configPanel.setLabel('Upload Document');

  await expect(
    formFrame.locator('text=Properties - Select File').first()
  ).toBeVisible({ timeout: 30000 });

  // ───── OPEN PREVIEW (INSIDE FORM IFRAME) ─────

// Commit editor state
await formFrame.locator('body').click({ force: true });
await page.waitForTimeout(1500);

// Locate Preview INSIDE iframe
const previewButton = formFrame
  .locator('span.clipped-text__string--for_presentation', {
    hasText: 'Preview'
  })
  .first();

// Wait until Preview is rendered
await previewButton.waitFor({ timeout: 30000 });

// Click Preview (parent button handles click)
await previewButton.click({ force: true });

// Give time for preview iframe to load
await page.waitForTimeout(4000);


  // ───── RUNTIME (FILE UPLOAD) ─────
 // Verify Textbox exists in canvas
await expect(
  formFrame.locator('text=Text Box').first()
).toBeVisible({ timeout: 30000 });

// Verify Select File exists in canvas
await expect(
  formFrame.locator('text=Select File').first()
).toBeVisible({ timeout: 30000 });

});
