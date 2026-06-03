import { test, expect } from '@playwright/test';
import { AuthClient } from '../../src/api/clients/AuthClient';

test('should generate auth token', async ({ request }) => {
  const authClient = new AuthClient(request);

  const token = await authClient.getToken();

  expect(token).toBeTruthy();
});