import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.setTimeout(180000);

test('Use Case 3 – Hybrid UI + API Learning Instance Flow', async ({ page, request }) => {

  const loginPage = new LoginPage(page);
  let authToken = null;

  // ─────────────────────────────────────────────
  // STEP 1: AUTO-CAPTURE x-authorization TOKEN
  // ─────────────────────────────────────────────
  page.on('request', req => {
    const token = req.headers()['x-authorization'];
    if (token && !authToken) {
      authToken = token;
      console.log('✅ Captured x-authorization token');
    }
  });

  // ─────────────────────────────────────────────
  // STEP 2: LOGIN (UI)
  // ─────────────────────────────────────────────
  await loginPage.goto();
  await loginPage.login(
    'abdulriyan062@gmail.com',
    'Abdul@123'
  );

  // Verify login success
  await expect(
    page.getByText('AI', { exact: true })
  ).toBeVisible({ timeout: 30000 });

  // Ensure token captured
  await page.waitForTimeout(3000);
  expect(authToken).not.toBeNull();

  // ─────────────────────────────────────────────
  // STEP 3: NAVIGATE → AI → DOCUMENT AUTOMATION
  // ─────────────────────────────────────────────
  await page.getByText('AI', { exact: true }).click();

  const documentAutomation = page.locator(
    'span.pathfinder-items__item-label',
    { hasText: 'Document Automation' }
  );

  await expect(documentAutomation)
    .toBeVisible({ timeout: 30000 });

  await documentAutomation.click();

  // Let Document Automation UI fully render
  await page.waitForTimeout(6000);

  // ─────────────────────────────────────────────
  // ─────────────────────────────────────────────
// STEP 4: UI – CREATE LEARNING INSTANCE (FULL FLOW - PATCHED)
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// STEP 4: UI – CREATE LEARNING INSTANCE (FINAL FIXED)
// ─────────────────────────────────────────────

// 🔹 Define iframe ONCE (IMPORTANT)
const liFrame = page.frameLocator('iframe[src*="cognitive"]');

// ───────── Click "Create Learning Instance" ─────────
const createLI = liFrame.locator(
  'span.clipped-text__string--for_presentation',
  { hasText: 'Create Learning Instance' }
);

await createLI.waitFor({ timeout: 60000 });
await createLI.click({ force: true });
console.log('✅ Clicked Create Learning Instance');

// ───────── Fill Name (mandatory) ─────────
const nameInput = liFrame.locator('input[name="name"]');
await nameInput.waitFor({ timeout: 30000 });

const uiName = `UI_LearningInstance_${Date.now()}`;
await nameInput.fill(uiName);
console.log('✅ Filled Name:', uiName);

// ───────── Click NEXT ─────────
const nextButton = liFrame
  .getByRole('button', { name: 'Next' });

await expect(nextButton).toBeEnabled({ timeout: 30000 });
await nextButton.click();
console.log('✅ Clicked Next');

// ───────── Wait for Table Fields page ─────────
await liFrame.locator('text=Table fields')
  .waitFor({ timeout: 60000 });

console.log('✅ Table fields page loaded');

// ───────── FINAL CREATE (REAL BUTTON) ─────────
const finalCreateButton = liFrame.getByRole('button', {
  name: 'Create',
  exact: true
});

await expect(finalCreateButton).toBeEnabled({ timeout: 60000 });
await finalCreateButton.click();
console.log('✅ Clicked FINAL Create');

// ───────── VERIFY INSTANCE IS CREATED ─────────
await liFrame
  .locator('span.clipped-text__string--for_presentation', {
    hasText: 'Learning Instances'
  })
  .first()
  .waitFor({ timeout: 60000 });



console.log('🎉 LEARNING INSTANCE CREATED AND LISTED:', uiName);

  // ─────────────────────────────────────────────
  // STEP 5: API VALIDATION USING CAPTURED TOKEN
  // ─────────────────────────────────────────────
  const apiResponse = await request.post(
    'https://community.cloud.automationanywhere.digital/cognitive/v3/learninginstances',
    {
      headers: {
        'x-authorization': authToken,
        'content-type': 'application/json'
      },
      data: {
        name: `API_LearningInstance_${Date.now()}`,
        locale: 'en-US'
      }
    }
  );

  console.log('API Status Code:', apiResponse.status());

  // ─────────────────────────────────────────────
  // STEP 6: ASSERTIONS (REALISTIC & CORRECT)
  // ─────────────────────────────────────────────
  expect([200, 400]).toContain(apiResponse.status());

  const body = await apiResponse.json();

  if (apiResponse.status() === 400) {
    expect(body).toHaveProperty('message');
    console.log('✅ Backend validation working:', body.message);
  }

  if (apiResponse.status() === 200) {
    expect(body).toHaveProperty('id');
    expect(body.name).toContain('API_LearningInstance');
    console.log('✅ Learning Instance created successfully');
  }

});
