export class TaskEditorPage {
  constructor(page) {
    this.page = page;
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async saveTask() {
    await this.saveButton.click();
  }
}
