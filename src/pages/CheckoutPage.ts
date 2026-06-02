import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;

  readonly continueBtn: Locator;
  readonly finishBtn: Locator;

  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');

    this.continueBtn = page.locator('#continue');
    this.finishBtn = page.locator('#finish');

    this.successMessage = page.locator('.complete-header');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async enterUserInfo(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continueCheckout() {
    await this.continueBtn.click();
  }

  async finishCheckout() {
    await this.finishBtn.click();
  }
}