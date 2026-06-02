import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/auth.fixture';
import { InventoryPage } from '../../src/pages/InventoryPage';

test.describe('Inventory Tests', () => {

  test('verify inventory count', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);

    const count = await inventory.getProductCount();

    expect(count).toBe(6);
  });

  test('verify sorting A-Z', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);

    await inventory.sort('az');

    const names = await inventory.getProductNames();

    const sorted = [...names].sort();

    expect(names).toEqual(sorted);
  });

  test('verify sorting Z-A', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);

    await inventory.sort('za');

    const names = await inventory.getProductNames();

    const sorted = [...names].sort().reverse();

    expect(names).toEqual(sorted);
  });

  test('verify sorting low to high', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);

    await inventory.sort('lohi');

    const prices = await inventory.getPrices();

    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });

  test('verify sorting high to low', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);

    await inventory.sort('hilo');

    const prices = await inventory.getPrices();

    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
  });

});