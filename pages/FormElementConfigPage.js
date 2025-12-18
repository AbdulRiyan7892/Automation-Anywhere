export class FormElementConfigPage {
  constructor(page) {
    this.page = page;

    // Form builder is inside iframe
    this.frame = page.frameLocator('iframe[src*="form"]');

    // Correct inputs (NOT contenteditable)
    this.labelInput = this.frame.locator(
      'input[name="label"]'
    );

    this.defaultValueInput = this.frame.locator(
      'input[name="defaultValue"]'
    );
  }

  async setLabel(text) {
    await this.labelInput.waitFor({ state: 'visible', timeout: 30000 });
    await this.labelInput.click({ force: true });
    await this.labelInput.fill('');
    await this.labelInput.type(text, { delay: 50 });
  }

  async setDefaultValue(text) {
    await this.defaultValueInput.waitFor({ state: 'visible', timeout: 30000 });
    await this.defaultValueInput.click({ force: true });
    await this.defaultValueInput.fill('');
    await this.defaultValueInput.type(text, { delay: 50 });
  }
}
