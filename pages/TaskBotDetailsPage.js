export class TaskBotDetailsPage {
  constructor(page) {
    this.page = page;

    // Task Bot name input
    this.nameInput = page.locator('input[name="name"]');

    // Specific button inside the dialog
    this.createAndEditButton = page.getByRole('button', {
      name: 'Create & edit',
      exact: true
    });
  }

  async fillTaskBotDetails(name) {
    await this.nameInput.waitFor({ timeout: 30000 });
    await this.nameInput.fill(name);

    await this.createAndEditButton.click();
  }
}
