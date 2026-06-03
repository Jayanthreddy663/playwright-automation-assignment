import { test, expect } from '@playwright/test';
import { AuthClient } from '../../src/api/clients/AuthClient';
import { BookingClient } from '../../src/api/clients/BookingClient';
import { BookingSchema } from '../../src/api/schemas/BookingSchema';
import { bookingPayloads } from '../../src/api/payloads/bookingPayloads';

test.describe('Booking CRUD', () => {

  test('should create booking', async ({ request }) => {
    const bookingClient = new BookingClient(request);
    const payload = bookingPayloads.create();

    const response = await bookingClient.createBooking(payload);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.booking).toMatchObject(payload);
    BookingSchema.parse(body.booking);
  });

  test('should read booking', async ({ request }) => {
    const bookingClient = new BookingClient(request);
    const payload = bookingPayloads.create();

    const createResponse = await bookingClient.createBooking(payload);
    const bookingId = (await createResponse.json()).bookingid;

    const getResponse = await bookingClient.getBooking(bookingId);

    expect(getResponse.status()).toBe(200);

    const booking = await getResponse.json();

    expect(booking).toMatchObject(payload);
    BookingSchema.parse(booking);
  });

  test('should update booking', async ({ request }) => {
    const authClient = new AuthClient(request);
    const bookingClient = new BookingClient(request);

    const token = await authClient.getToken();
    const payload = bookingPayloads.create();

    const createResponse = await bookingClient.createBooking(payload);
    const bookingId = (await createResponse.json()).bookingid;

    const updateResponse = await bookingClient.updateBooking(
      bookingId,
      token,
      bookingPayloads.updated()
    );

    expect(updateResponse.status()).toBe(200);

    const updatedBooking = await updateResponse.json();

    expect(updatedBooking.firstname).toBe('Alex');
    BookingSchema.parse(updatedBooking);
  });

  test('should patch booking', async ({ request }) => {
    const authClient = new AuthClient(request);
    const bookingClient = new BookingClient(request);

    const token = await authClient.getToken();
    const payload = bookingPayloads.create();

    const createResponse = await bookingClient.createBooking(payload);
    const bookingId = (await createResponse.json()).bookingid;

    const patchResponse = await bookingClient.patchBooking(
      bookingId,
      token,
      bookingPayloads.patch()
    );

    expect(patchResponse.status()).toBe(200);

    const patchedBooking = await patchResponse.json();

    expect(patchedBooking.firstname).toBe('Patched');
    BookingSchema.parse(patchedBooking);
  });

  test('should delete booking', async ({ request }) => {
    const authClient = new AuthClient(request);
    const bookingClient = new BookingClient(request);

    const token = await authClient.getToken();
    const payload = bookingPayloads.create();

    const createResponse = await bookingClient.createBooking(payload);
    const bookingId = (await createResponse.json()).bookingid;

    const deleteResponse = await bookingClient.deleteBooking(bookingId, token);

    expect(deleteResponse.status()).toBe(201);
  });

});