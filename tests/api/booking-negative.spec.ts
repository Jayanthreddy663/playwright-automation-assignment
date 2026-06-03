import { test, expect } from '@playwright/test';
import { API_CONSTANTS } from '../../src/data/apiConstants';
import { BookingClient } from '../../src/api/clients/BookingClient';
import { bookingPayloads } from '../../src/api/payloads/bookingPayloads';

test.describe('Negative Scenarios', () => {

  test('update without token', async ({ request }) => {
    const bookingClient = new BookingClient(request);
    const payload = bookingPayloads.create();

    const createResponse = await bookingClient.createBooking(payload);
    const bookingId = (await createResponse.json()).bookingid;

    const response = await request.put(
      `${API_CONSTANTS.BASE_URL}/booking/${bookingId}`,
      { data: payload }
    );

    expect(response.status()).toBe(403);
  });

  test('non existent booking', async ({ request }) => {
    const bookingClient = new BookingClient(request);

    const response = await bookingClient.getBooking(999999999);

    expect(response.status()).toBe(404);
  });

  test('malformed payload', async ({ request }) => {
    const bookingClient = new BookingClient(request);

    const response = await bookingClient.createBooking(
      bookingPayloads.malformed()
    );

    expect(response.ok()).toBeFalsy();
  });

});