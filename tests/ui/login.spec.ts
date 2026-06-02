import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { users } from '../../src/data/users';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

test('standard user login', async ({ page }) => {
  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await expect(page).toHaveURL(/inventory/);
});

test('locked user should see error', async () => {
  await loginPage.login(
    users.locked.username,
    users.locked.password
  );

  await expect(loginPage.errorMessage)
    .toContainText(users.locked.errorMessage);
});

test('problem user login', async ({ page }) => {
  await loginPage.login(
    users.problem.username,
    users.problem.password
  );

  await expect(page).toHaveURL(/inventory/);
});

test('invalid password should show error', async () => {
  await loginPage.login(
    users.invalid.username,
    users.invalid.password
  );

  await expect(loginPage.errorMessage)
    .toContainText(users.invalid.errorMessage);
});