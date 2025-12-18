export class FormActionsPanelPage {
  constructor(page) {
    this.page = page;

    // 🔑 Form builder lives inside an iframe
    this.frame = page.frameLocator('iframe[src*="form"]');

    // Element to drag (inside iframe)
    this.textBoxSource = this.frame
  .locator('span.clipped-text__string', { hasText: 'Text Box' })
  .first();


    this.fileUploadSource = this.frame
  .locator('span.clipped-text__string', { hasText: 'Select File' })
  .first();

    // Drop zone (inside iframe)
    this.dropZone = this.frame.locator(
      'div.formcanvas__leftpane[data-item-type="content"]'
    );
  }

  async dragTextBox() {
    await this.textBoxSource.waitFor({ timeout: 30000 });
    await this.dropZone.waitFor({ timeout: 30000 });

    const source = await this.textBoxSource.boundingBox();
    const target = await this.dropZone.boundingBox();

    if (!source || !target) {
      throw new Error('Text Box source or drop zone not found');
    }

    await this.page.mouse.move(
      source.x + source.width / 2,
      source.y + source.height / 2
    );
    await this.page.mouse.down();

    await this.page.mouse.move(
      target.x + target.width / 2,
      target.y + target.height / 2,
      { steps: 25 }
    );

    await this.page.mouse.up();
  }

  async dragFileUpload() {
    await this.fileUploadSource.waitFor({ timeout: 30000 });
    await this.dropZone.waitFor({ timeout: 30000 });

    const source = await this.fileUploadSource.boundingBox();
    const target = await this.dropZone.boundingBox();

    if (!source || !target) {
      throw new Error('File Upload source or drop zone not found');
    }

    await this.page.mouse.move(
      source.x + source.width / 2,
      source.y + source.height / 2
    );
    await this.page.mouse.down();

    await this.page.mouse.move(
      target.x + target.width / 2,
      target.y + target.height / 2 + 120,
      { steps: 25 }
    );

    await this.page.mouse.up();
  }
}
