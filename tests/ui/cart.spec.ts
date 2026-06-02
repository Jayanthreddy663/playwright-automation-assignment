import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/auth.fixture';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CartPage } from '../../src/pages/CartPage';

test.describe('Cart Tests', () => {

  test('add items to cart and verify badge count', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);

    await inventory.addToCart(0);
    await inventory.addToCart(1);
    await inventory.addToCart(2);

    await expect(inventory.cartBadge).toHaveText('3');
  });

  test('remove item from cart', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);
    const selectedProductNames = (await inventory.getProductNames()).slice(0, 3);

    expect(selectedProductNames).toHaveLength(3);
    const [firstProductName, secondProductName, thirdProductName] = selectedProductNames;

    if (!firstProductName || !secondProductName || !thirdProductName) {
      throw new Error('Expected at least 3 products in inventory');
    }

    await inventory.addToCart(0);
    await inventory.addToCart(1);
    await inventory.addToCart(2);

    await inventory.openCart();

    const cart = new CartPage(loggedInPage);

    expect(await cart.getItemCount()).toBe(3);
    expect(await cart.getItemNames()).toEqual(
      expect.arrayContaining([
        firstProductName,
        secondProductName,
        thirdProductName
      ])
    );

    await cart.removeItem(0);

    expect(await cart.getItemCount()).toBe(2);
    const remainingItemNames = await cart.getItemNames();

    expect(remainingItemNames).toEqual(
      expect.arrayContaining([
        secondProductName,
        thirdProductName
      ])
    );
    expect(remainingItemNames).not.toContain(firstProductName);
  });

});