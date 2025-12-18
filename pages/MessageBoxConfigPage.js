export class MessageBoxConfigPage {
  constructor(page) {
    this.page = page;

    // Direct DOM selectors (NOT accessibility)
    this.titleInput = page.locator(
      'div[contenteditable="true"][name="title"]'
    );

    this.messageInput = page.locator(
      'div[contenteditable="true"][name="content"]'
    );
  }

  async configureMessageBox(message, title) {
    // Wait until inputs are ATTACHED to DOM (not visible)
    await this.titleInput.waitFor({ state: 'attached', timeout: 60000 });

    // ---- Title ----
    await this.titleInput.click({ force: true });
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.type(title, { delay: 80 });

    // ---- Message ----
    await this.messageInput.click({ force: true });
    await this.page.keyboard.type(message, { delay: 80 });
  }
}
