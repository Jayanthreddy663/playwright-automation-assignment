import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
  }

  async getItemCount() {
    return this.cartItems.count();
  }

  async getItemNames() {
    return this.cartItemNames.allTextContents();
  }

  async removeItem(index: number) {
    await this.page.locator('.cart_button').nth(index).click();
  }

  async checkout() {
    await this.page.locator('#checkout').click();
  }
}