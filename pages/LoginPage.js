export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[type="password"]';
    this.loginButton = 'button[name="submitLogin"]';
  }

  async goto() {
    await this.page.goto(
      'https://community.cloud.automationanywhere.digital/',
      { waitUntil: 'domcontentloaded' }
    );
  }

  async login(username, password) {
    await this.page.waitForSelector(this.usernameInput, { timeout: 60000 });
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
