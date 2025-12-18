export class AutomationPage {
  constructor(page) {
    this.page = page;
    this.automationMenu = page.getByRole('link', {
      name: 'Automation',
      exact: true
    });
  }

  async goToAutomation() {
    await this.automationMenu.click();
  }
}
