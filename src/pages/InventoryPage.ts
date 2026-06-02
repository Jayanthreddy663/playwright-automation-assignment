import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly addToCartButtons: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.addToCartButtons = page.locator('.btn_inventory');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');

    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async getProductCount() {
    return this.inventoryItems.count();
  }

  async sort(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async addToCart(index: number) {
    await this.addToCartButtons.nth(index).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }

  async getProductNames() {
    return this.page
      .locator('.inventory_item_name')
      .allTextContents();
  }

  async getPrices() {
    const prices = await this.page
      .locator('.inventory_item_price')
      .allTextContents();

    return prices.map(price =>
      Number(price.replace('$', ''))
    );
  }
}