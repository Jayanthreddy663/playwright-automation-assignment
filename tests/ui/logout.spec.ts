import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/auth.fixture';
import { InventoryPage } from '../../src/pages/InventoryPage';

test.describe('Logout Tests', () => {

  test('logout successfully', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);

    await inventory.logout();

    await expect(loggedInPage)
      .toHaveURL(new URL('/', process.env.BASE_URL).toString());
  });

});