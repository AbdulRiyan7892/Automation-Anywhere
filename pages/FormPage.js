export class FormPage {
  constructor(page) {
    this.page = page;

    this.createButton = page.getByRole('button', { name: 'Create' });

    // 🔑 Form option in dropdown
    this.formOption = page.locator(
      '.dropdown-option-label',
      { hasText: 'Form' }
    );

    this.formNameInput = page.locator('input[name="name"]');

    this.createFormButton = page.getByRole('button', {
      name: 'Create & edit'
    });
  }

  async createForm(formName) {
    await this.createButton.click();

    await this.formOption.waitFor({ timeout: 30000 });
    await this.formOption.click();

    await this.formNameInput.waitFor({ timeout: 30000 });
    await this.formNameInput.fill(formName);

    await this.createFormButton.click();
  }
}
