export class ActionsPanelPage {
  constructor(page) {
    this.page = page;

    this.searchInput = page.getByPlaceholder('Search');

    this.messageBoxCategory = page.getByText('Message box', { exact: true });

    this.messageBoxAction = page.getByRole('button', {
      name: 'Message box',
      exact: true
    });

    // Canvas node (Message box in flow)
    this.messageBoxFlowNode = page
      .locator('text=Message box')
      .last();
  }

  async addAndActivateMessageBox() {
    await this.searchInput.fill('message');

    await this.messageBoxCategory.click();
    await this.messageBoxAction.dblclick();

    // 🔑 CRITICAL: activate edit mode
    await this.messageBoxFlowNode.dblclick();
  }
}
