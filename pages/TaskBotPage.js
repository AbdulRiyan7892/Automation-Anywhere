export class TaskBotPage {
  constructor(page) {
    this.page = page;
    this.createButton = page.locator('button:has-text("Create")');
    this.taskBotOption = page.locator('text=Task Bot');
  }

  async createTaskBot() {
    await this.createButton.click();
    await this.taskBotOption.click();
  }
}
