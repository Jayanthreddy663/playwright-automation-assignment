import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/auth.fixture';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import { checkoutData } from '../../src/data/checkoutData';

test.describe('Checkout Tests', () => {

  test('successful checkout', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);

    await inventory.addToCart(0);

    await inventory.openCart();

    const cart = new CartPage(loggedInPage);

    await cart.checkout();

    const checkout = new CheckoutPage(loggedInPage);

    await checkout.enterUserInfo(
      checkoutData.validUser.firstName,
      checkoutData.validUser.lastName,
      checkoutData.validUser.postalCode
    );

    await checkout.continueCheckout();

    await checkout.finishCheckout();

    await expect(checkout.successMessage)
      .toContainText(checkoutData.validUser.successMessage);
  });

  test('show error when postal code is missing', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);

    await inventory.addToCart(0);

    await inventory.openCart();

    const cart = new CartPage(loggedInPage);

    await cart.checkout();

    const checkout = new CheckoutPage(loggedInPage);

    await checkout.enterUserInfo(
      checkoutData.missingPostalCode.firstName,
      checkoutData.missingPostalCode.lastName,
      checkoutData.missingPostalCode.postalCode
    );

    await checkout.continueCheckout();

    await expect(checkout.errorMessage)
      .toContainText(checkoutData.missingPostalCode.errorMessage);
  });

});