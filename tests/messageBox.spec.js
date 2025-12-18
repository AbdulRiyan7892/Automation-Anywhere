import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AutomationPage } from '../pages/AutomationPage';
import { TaskBotPage } from '../pages/TaskBotPage';
import { TaskBotDetailsPage } from '../pages/TaskBotDetailsPage';
import { ActionsPanelPage } from '../pages/ActionsPanelPage';
import { MessageBoxConfigPage } from '../pages/MessageBoxConfigPage';

test.setTimeout(120000);

test('Create Message Box Task', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const automationPage = new AutomationPage(page);
  const taskBotPage = new TaskBotPage(page);
  const taskBotDetailsPage = new TaskBotDetailsPage(page);
  const actionsPanel = new ActionsPanelPage(page);
  const messageBoxConfig = new MessageBoxConfigPage(page);

  await loginPage.goto();
  await loginPage.login('abdulriyan062@gmail.com', 'Abdul@123');

  await expect(
  page.getByRole('link', { name: 'Automation', exact: true })
).toBeVisible({ timeout: 30000 });


  await automationPage.goToAutomation();
  await taskBotPage.createTaskBot();
  await taskBotDetailsPage.fillTaskBotDetails(
  `MessageBox_Task_${Date.now()}`

);
await expect(
  page.locator('text=Actions')
).toBeVisible({ timeout: 300000 });
await actionsPanel.addAndActivateMessageBox();


await messageBoxConfig.configureMessageBox(
  'Hello from automated Message Box',
  'Automation Anywhere'
);




const saveButton = page.getByRole('button', { name: 'Save' });
await saveButton.click();

// Verify save completed
await expect(saveButton).toHaveAttribute(
  'data-input-status',
  'DISABLED',
  { timeout: 30000 }
);


});
